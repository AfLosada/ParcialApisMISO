import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Plato } from '../plato/entities/plato.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Restaurante>,
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async findAll(): Promise<Restaurante[]> {
    return this.restauranteRepository.find({ relations: ['platos'] });
  }

  async findOne(id: number): Promise<Restaurante | null> {
    return this.restauranteRepository.findOne({ 
      where: { id },
      relations: ['platos'] 
    });
  }

  async create(restaurante: Restaurante): Promise<Restaurante> {
    return this.restauranteRepository.save(restaurante);
  }

  async update(id: number, restaurante: Restaurante) {
    await this.restauranteRepository.update(id, restaurante);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.restauranteRepository.delete(id);
  }

  async addPlatoToRestaurante(restauranteId: number, platoId: number): Promise<Restaurante | null> {
    const restaurante = await this.findOne(restauranteId);
    if (!restaurante) {
      throw new NotFoundException(`Restaurante with ID ${restauranteId} not found`);
    }

    const plato = await this.platoRepository.findOne({ where: { id: platoId } });
    if (!plato) {
      throw new NotFoundException(`Plato with ID ${platoId} not found`);
    }

    if (!restaurante.platos) {
      restaurante.platos = [];
    }

    // Check if the plate is already in the restaurant to avoid duplicates
    const exists = restaurante.platos.some(p => p.id === platoId);
    if (!exists) {
      restaurante.platos.push(plato);
      await this.restauranteRepository.save(restaurante);
    }

    return this.findOne(restauranteId);
  }

  async removePlatoFromRestaurante(restauranteId: number, platoId: number): Promise<Restaurante | null> {
    const restaurante = await this.findOne(restauranteId);
    if (!restaurante) {
      throw new NotFoundException(`Restaurante with ID ${restauranteId} not found`);
    }

    if (!restaurante.platos) {
      return restaurante;
    }

    restaurante.platos = restaurante.platos.filter(plato => plato.id !== platoId);
    await this.restauranteRepository.save(restaurante);

    return this.findOne(restauranteId);
  }

  async updateRestaurantDishes(restauranteId: number, dishIds: number[]): Promise<Restaurante | null> {
    const restaurante = await this.findOne(restauranteId);
    if (!restaurante) {
      throw new NotFoundException(`Restaurante with ID ${restauranteId} not found`);
    }
    
    // Find all the plates by their IDs
    const plates = await this.platoRepository.findBy({
      id: In(dishIds),
    });
    
    // Check if all plates were found
    if (plates.length !== dishIds.length) {
      const foundIds = plates.map(plate => plate.id);
      const missingIds = dishIds.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Some plates were not found: ${missingIds.join(', ')}`);
    }
    
    // Replace all plates in the restaurant
    restaurante.platos = plates;
    await this.restauranteRepository.save(restaurante);
    
    return this.findOne(restauranteId);
  }
}
