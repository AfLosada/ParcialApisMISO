import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Restaurante } from './entities/restaurante.entity';
export declare class RestauranteController {
    private readonly restauranteService;
    constructor(restauranteService: RestauranteService);
    create(createRestauranteDto: CreateRestauranteDto): Promise<Restaurante>;
    findAll(): Promise<Restaurante[]>;
    findOne(id: string): Promise<Restaurante | null>;
    update(id: string, updateRestauranteDto: UpdateRestauranteDto): Promise<Restaurante | null>;
    remove(id: string): Promise<void>;
}
