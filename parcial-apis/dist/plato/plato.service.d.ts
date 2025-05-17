import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';
export declare class PlatoService {
    private readonly platoRepository;
    constructor(platoRepository: Repository<Plato>);
    findAll(): Promise<Plato[]>;
    findOne(id: number): Promise<Plato | null>;
    create(plato: Plato): Promise<Plato>;
    update(id: number, plato: Plato): Promise<Plato | null>;
    remove(id: number): Promise<void>;
}
