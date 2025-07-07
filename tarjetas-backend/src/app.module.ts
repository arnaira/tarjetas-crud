import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarjetasModule } from './tarjetas/tarjetas.module';

@Module({
  imports: [TarjetasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
