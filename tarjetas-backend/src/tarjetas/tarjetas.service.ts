import { Injectable } from '@nestjs/common';
import { getConnection } from '../database';
import * as fs from 'fs';

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
        [title, description]
      );
      await conn.commit();

      fs.appendFileSync(
        'logs.txt',
        `CREATED tarjeta: ${title} at ${new Date().toISOString()}\n`,
      );
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
        [title, description, id]
      );
      await conn.commit();

      fs.appendFileSync(
        'logs.txt',
        `UPDATED tarjeta ID: ${id} at ${new Date().toISOString()}\n`,
      );
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

      fs.appendFileSync(
        'logs.txt',
        `DELETED tarjeta ID: ${id} at ${new Date().toISOString()}\n`,
      );
      return { message: 'Tarjeta eliminada exitosamente' };
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      await conn.end();
    }
  }
}
