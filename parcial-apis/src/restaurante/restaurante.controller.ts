import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Restaurante } from './entities/restaurante.entity';

@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  create(@Body() createRestauranteDto: CreateRestauranteDto) {
    const restaurante = new Restaurante();
    restaurante.nombre = createRestauranteDto.nombre;
    restaurante.direccion = createRestauranteDto.direccion;
    restaurante.tipoDeCocina = createRestauranteDto.tipoDeCocina;
    restaurante.paginaWeb = createRestauranteDto.paginaWeb;
    return this.restauranteService.create(restaurante);
  }

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restauranteService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRestauranteDto: UpdateRestauranteDto) {
    const restaurante = new Restaurante();
    if (updateRestauranteDto.nombre) restaurante.nombre = updateRestauranteDto.nombre;
    if (updateRestauranteDto.direccion) restaurante.direccion = updateRestauranteDto.direccion;
    if (updateRestauranteDto.tipoDeCocina) restaurante.tipoDeCocina = updateRestauranteDto.tipoDeCocina;
    if (updateRestauranteDto.paginaWeb) restaurante.paginaWeb = updateRestauranteDto.paginaWeb;
    return this.restauranteService.update(+id, restaurante);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restauranteService.remove(+id);
  }
}
