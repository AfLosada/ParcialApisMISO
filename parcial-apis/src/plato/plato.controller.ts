import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Plato } from './entities/plato.entity';

@Controller('platos')
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  create(@Body() createPlatoDto: CreatePlatoDto) {
    const plato = new Plato();
    plato.nombre = createPlatoDto.nombre;
    plato.descripcion = createPlatoDto.descripcion;
    plato.precio = createPlatoDto.precio;
    plato.categoria = createPlatoDto.categoria;
    return this.platoService.create(plato);
  }

  @Get()
  findAll() {
    return this.platoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlatoDto: UpdatePlatoDto) {
    const plato = new Plato();
    if (updatePlatoDto.nombre) plato.nombre = updatePlatoDto.nombre;
    if (updatePlatoDto.descripcion) plato.descripcion = updatePlatoDto.descripcion;
    if (updatePlatoDto.precio) plato.precio = updatePlatoDto.precio;
    if (updatePlatoDto.categoria) plato.categoria = updatePlatoDto.categoria;
    return this.platoService.update(+id, plato);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platoService.remove(+id);
  }
}
