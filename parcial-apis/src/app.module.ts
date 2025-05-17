import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PlatoModule } from './plato/plato.module';
import { Restaurante } from './restaurante/entities/restaurante.entity';
import { Plato } from './plato/entities/plato.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Restaurante, Plato],
      synchronize: true,
    }),
    RestauranteModule,
    PlatoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
