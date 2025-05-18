import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';

const tipos_categoria = ["entrada", "plato fuerte", "postre", "bebida"];

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
    if (tipos_categoria.includes(plato.categoria.toLowerCase())){
      return this.platoRepository.save(plato);
    } else {
      throw new BadRequestException('Invalid dish type');
    }
  }

  async update(id: number, plato: Plato): Promise<Plato | null> {
    if (tipos_categoria.includes(plato.categoria.toLowerCase())){
      await this.platoRepository.update(id, plato);
      return this.findOne(id);
    } else {
      throw new BadRequestException('Invalid dish type');
    }
  }

  async remove(id: number): Promise<void> {
    await this.platoRepository.delete(id);
  }
}
