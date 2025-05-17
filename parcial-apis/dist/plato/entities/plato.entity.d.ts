import { Restaurante } from '../../restaurante/entities/restaurante.entity';
export declare class Plato {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    restaurantes: Restaurante[];
}
