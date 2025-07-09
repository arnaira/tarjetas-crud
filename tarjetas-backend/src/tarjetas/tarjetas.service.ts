/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { getConnection } from '../database';
import { logToFile } from 'src/utils/logger';

@Injectable()
export class TarjetasService {
  async findAll() {
    const conn = await getConnection();
    const [rows] = await conn.query('SELECT * FROM tarjetas');
    await conn.end();
    return rows;
  }

  async create(title: string, description: string) {
    const conn = await getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        'INSERT INTO tarjetas (title, description) VALUES (?, ?)',
        [title, description],
      );
      await conn.commit();

      logToFile({
        timestamp: new Date().toISOString(),
        action: 'create',
        tarjeta: { title, description },
      });

      return { message: 'Tarjeta creada exitosamente' };
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      await conn.end();
    }
  }

  async update(id: number, title: string, description: string) {
    const conn = await getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        'UPDATE tarjetas SET title = ?, description = ? WHERE id = ?',
        [title, description, id],
      );
      await conn.commit();

      logToFile({
        timestamp: new Date().toISOString(),
        action: 'update',
        tarjetaId: id,
        updates: { title, description },
      });

      return { message: 'Tarjeta actualizada exitosamente' };
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      await conn.end();
    }
  }

  async delete(id: number) {
    const conn = await getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('DELETE FROM tarjetas WHERE id = ?', [id]);
      await conn.commit();

      logToFile({
        timestamp: new Date().toISOString(),
        action: 'delete',
        tarjetaId: id,
      });

      return { message: 'Tarjeta eliminada exitosamente' };
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      await conn.end();
    }
  }

  async getReporte() {
    const conn = await getConnection();
    try {
      // Obtener total
      const [totalRows]: any[] = await conn.query(
        'SELECT COUNT(*) as total FROM tarjetas',
      );
      const totalTarjetas = totalRows[0]?.total || 0;

      // Obtener último título
      const [titleRows]: any[] = await conn.query(
        'SELECT title FROM tarjetas ORDER BY created_at DESC LIMIT 1',
      );
      const ultimaTarjetaCreada = titleRows[0]?.title || null;

      return { totalTarjetas, ultimaTarjetaCreada };
    } finally {
      await conn.end();
    }
  }
}
