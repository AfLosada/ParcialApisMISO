import { Plato } from '../../plato/entities/plato.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  tipoDeCocina: string;

  @Column()
  paginaWeb: string;

  @ManyToMany(() => Plato, plato => plato.restaurantes)
  @JoinTable()
  platos: Plato[];
}
