import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Plato } from '../plato/entities/plato.entity';
import { RestaurantePlatoController } from './restaurante-plato.controller';
import { PlatoModule } from '../plato/plato.module';
import { RestauranteController } from './restaurante.controller';
import { RestauranteService } from './restaurante.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurante, Plato]),
    PlatoModule
  ],
  controllers: [RestauranteController, RestaurantePlatoController],
  providers: [RestauranteService],
  exports: [RestauranteService],
})
export class RestauranteModule {}
