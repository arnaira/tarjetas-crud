import { ApiProperty } from '@nestjs/swagger';

export class TarjetaDto {
  @ApiProperty({ example: 'Preparar entrevista NestJS' })
  title: string;

  @ApiProperty({ example: 'Practicar transacciones, swagger y logs' })
  description: string;
}
