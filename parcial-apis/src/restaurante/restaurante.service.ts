import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurante } from './entities/restaurante.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Restaurante>,
  ) {}

  async findAll(): Promise<Restaurante[]> {
    return this.restauranteRepository.find({ relations: ['platos'] });
  }

  async findOne(id: number): Promise<Restaurante> {
    return this.restauranteRepository.findOne({ 
      where: { id },
      relations: ['platos'] 
    });
  }

  async create(restaurante: Restaurante): Promise<Restaurante> {
    return this.restauranteRepository.save(restaurante);
  }

  async update(id: number, restaurante: Restaurante): Promise<Restaurante> {
    await this.restauranteRepository.update(id, restaurante);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.restauranteRepository.delete(id);
  }
}
