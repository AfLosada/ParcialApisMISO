import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';

@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  categoria: string; // entrada, plato fuerte, postre, bebida

  @ManyToMany(() => Restaurante, restaurante => restaurante.platos)
  restaurantes: Restaurante[];
}
