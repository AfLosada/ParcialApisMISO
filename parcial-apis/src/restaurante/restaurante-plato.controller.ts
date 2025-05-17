import { Controller, Get, Post, Delete, Param, Body, NotFoundException, Put } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { PlatoService } from '../plato/plato.service';

@Controller('restaurantes/:restauranteId/platos')
export class RestaurantePlatoController {   
  constructor(
    private readonly restauranteService: RestauranteService,
    private readonly platoService: PlatoService,
  ) {}

  @Get()
  async findDishesByRestaurant(@Param('restauranteId') restauranteId: string) {
    const restaurante = await this.restauranteService.findOne(+restauranteId);
    if (!restaurante) {
      throw new NotFoundException(`Restaurante with ID ${restauranteId} not found`);
    }
    return restaurante.platos;
  }

  @Get(':platoId')
  async findDishInRestaurant(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    const restaurante = await this.restauranteService.findOne(+restauranteId);
    if (!restaurante) {
      throw new NotFoundException(`Restaurante with ID ${restauranteId} not found`);
    }
    const plato = restaurante.platos.find(plato => plato.id === +platoId);
    if (!plato) {
      throw new NotFoundException(`Plato with ID ${platoId} not found in restaurant ${restauranteId}`);
    }
    return plato;
  }

  @Post(':platoId')
  async addDishToRestaurant(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return this.restauranteService.addPlatoToRestaurante(+restauranteId, +platoId);
  }

  @Delete(':platoId')
  async removeDishFromRestaurant(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return this.restauranteService.removePlatoFromRestaurante(+restauranteId, +platoId);
  }

  @Put()
  async updateRestaurantDishes(
    @Param('restauranteId') restauranteId: string,
    @Body() dishIds: number[],
  ) {
    return this.restauranteService.updateRestaurantDishes(+restauranteId, dishIds);
  }
}
