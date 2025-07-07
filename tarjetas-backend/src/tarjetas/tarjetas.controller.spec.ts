import { Test, TestingModule } from '@nestjs/testing';
import { TarjetasController } from './tarjetas.controller';

describe('TarjetasController', () => {
  let controller: TarjetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarjetasController],
    }).compile();

    controller = module.get<TarjetasController>(TarjetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
