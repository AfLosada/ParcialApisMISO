import { Plato } from '../../plato/entities/plato.entity';
export declare class Restaurante {
    id: number;
    nombre: string;
    direccion: string;
    tipoDeCocina: string;
    paginaWeb: string;
    platos: Plato[];
}
