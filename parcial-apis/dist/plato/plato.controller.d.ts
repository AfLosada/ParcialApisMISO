import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Plato } from './entities/plato.entity';
export declare class PlatoController {
    private readonly platoService;
    constructor(platoService: PlatoService);
    create(createPlatoDto: CreatePlatoDto): Promise<Plato>;
    findAll(): Promise<Plato[]>;
    findOne(id: string): Promise<Plato | null>;
    update(id: string, updatePlatoDto: UpdatePlatoDto): Promise<Plato | null>;
    remove(id: string): Promise<void>;
}
