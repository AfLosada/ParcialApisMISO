import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async findAll(): Promise<Plato[]> {
    return this.platoRepository.find({ relations: ['restaurantes'] });
  }

  async findOne(id: number): Promise<Plato | null> {
    return this.platoRepository.findOne({ 
      where: { id },
      relations: ['restaurantes'] 
    });
  }

  async create(plato: Plato): Promise<Plato> {
    return this.platoRepository.save(plato);
  }

  async update(id: number, plato: Plato): Promise<Plato | null> {
    await this.platoRepository.update(id, plato);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.platoRepository.delete(id);
  }
}
