import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TarjetasService } from './tarjetas.service';
import { TarjetaDto } from './tarjetas.dto';

@ApiTags('tarjetas')
@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Get('reporte')
  getReporte() {
    return this.tarjetasService.getReporte();
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las tarjetas' })
  findAll() {
    return this.tarjetasService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una tarjeta' })
  @ApiBody({ type: TarjetaDto })
  create(@Body() body: TarjetaDto) {
    return this.tarjetasService.create(body.title, body.description);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarjeta por ID' })
  @ApiBody({ type: TarjetaDto })
  update(@Param('id') id: string, @Body() body: TarjetaDto) {
    return this.tarjetasService.update(
      Number(id),
      body.title,
      body.description,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarjeta por ID' })
  delete(@Param('id') id: string) {
    return this.tarjetasService.delete(Number(id));
  }
}
