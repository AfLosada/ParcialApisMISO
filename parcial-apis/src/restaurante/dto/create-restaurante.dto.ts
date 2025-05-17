import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateRestauranteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  tipoDeCocina: string;

  @IsNotEmpty()
  @IsUrl()
  paginaWeb: string;
}
