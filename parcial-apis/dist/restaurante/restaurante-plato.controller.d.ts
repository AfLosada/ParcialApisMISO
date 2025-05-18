import { RestauranteService } from './restaurante.service';
import { PlatoService } from '../plato/plato.service';
export declare class RestaurantePlatoController {
    private readonly restauranteService;
    private readonly platoService;
    constructor(restauranteService: RestauranteService, platoService: PlatoService);
    findDishesByRestaurant(restauranteId: string): Promise<import("../plato/entities/plato.entity").Plato[]>;
    findDishInRestaurant(restauranteId: string, platoId: string): Promise<import("../plato/entities/plato.entity").Plato>;
    addDishToRestaurant(restauranteId: string, platoId: string): Promise<import("./entities/restaurante.entity").Restaurante | null>;
    removeDishFromRestaurant(restauranteId: string, platoId: string): Promise<import("./entities/restaurante.entity").Restaurante | null>;
    updateRestaurantDishes(restauranteId: string, dishIds: number[]): Promise<import("./entities/restaurante.entity").Restaurante | null>;
}
