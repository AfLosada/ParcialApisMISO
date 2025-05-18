import { Repository } from 'typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Plato } from '../plato/entities/plato.entity';
export declare class RestauranteService {
    private readonly restauranteRepository;
    private readonly platoRepository;
    constructor(restauranteRepository: Repository<Restaurante>, platoRepository: Repository<Plato>);
    findAll(): Promise<Restaurante[]>;
    findOne(id: number): Promise<Restaurante | null>;
    create(restaurante: Restaurante): Promise<Restaurante>;
    update(id: number, restaurante: Restaurante): Promise<Restaurante | null>;
    remove(id: number): Promise<void>;
    addPlatoToRestaurante(restauranteId: number, platoId: number): Promise<Restaurante | null>;
    removePlatoFromRestaurante(restauranteId: number, platoId: number): Promise<Restaurante | null>;
    updateRestaurantDishes(restauranteId: number, dishIds: number[]): Promise<Restaurante | null>;
}
