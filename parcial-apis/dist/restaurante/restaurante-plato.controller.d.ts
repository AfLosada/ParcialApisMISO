import { RestauranteService } from './restaurante.service';
import { PlatoService } from '../plato/plato.service';
export declare class RestaurantePlatoController {
    private readonly restauranteService;
    private readonly platoService;
    constructor(restauranteService: RestauranteService, platoService: PlatoService);
    findPlatosByRestaurante(restauranteId: string): Promise<import("../plato/entities/plato.entity").Plato[]>;
    findPlatoInRestaurante(restauranteId: string, platoId: string): Promise<import("../plato/entities/plato.entity").Plato>;
    addPlatoToRestaurante(restauranteId: string, platoId: string): Promise<import("./entities/restaurante.entity").Restaurante | null>;
    removePlatoFromRestaurante(restauranteId: string, platoId: string): Promise<import("./entities/restaurante.entity").Restaurante | null>;
}
