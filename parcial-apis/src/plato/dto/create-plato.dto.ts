import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePlatoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsNotEmpty()
  @IsString()
  categoria: string; // entrada, plato fuerte, postre, bebida
}
