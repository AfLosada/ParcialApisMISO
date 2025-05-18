import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from './entities/plato.entity';
import { PlatoController } from './plato.controller';
import { PlatoService } from './plato.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  controllers: [PlatoController],
  providers: [PlatoService],
  exports: [PlatoService],
})
export class PlatoModule {}
