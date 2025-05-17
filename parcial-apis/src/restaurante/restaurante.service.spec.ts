import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteService } from './restaurante.service';
import { Restaurante } from './entities/restaurante.entity';
import { Plato } from '../plato/entities/plato.entity';
import { NotFoundException } from '@nestjs/common';

// Mock type for Repository
//@ts-expect-error
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// Create mock repository factory function
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findBy: jest.fn(),
});

describe('RestauranteService', () => {
  let service: RestauranteService;
  let restauranteRepository: MockRepository<Restaurante>;
  let platoRepository: MockRepository<Plato>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestauranteService,
        {
          provide: getRepositoryToken(Restaurante),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Plato),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    restauranteRepository = module.get<MockRepository<Restaurante>>(
      getRepositoryToken(Restaurante),
    );
    platoRepository = module.get<MockRepository<Plato>>(
      getRepositoryToken(Plato),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const mockRestaurantes: Restaurante[] = [
        {
          id: 1,
          nombre: 'Restaurant 1',
          direccion: 'Address 1',
          tipoDeCocina: 'Italiana',
          paginaWeb: 'https://restaurant1.com',
          platos: [],
        },
        {
          id: 2,
          nombre: 'Restaurant 2',
          direccion: 'Address 2',
          tipoDeCocina: 'Mexicana',
          paginaWeb: 'https://restaurant2.com',
          platos: [],
        },
      ];
      restauranteRepository.find?.mockResolvedValue(mockRestaurantes);

      const result = await service.findAll();
      expect(result).toEqual(mockRestaurantes);
      expect(restauranteRepository.find).toHaveBeenCalledWith({
        relations: ['platos'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a restaurant when it exists', async () => {
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [],
      };
      restauranteRepository.findOne?.mockResolvedValue(mockRestaurante);

      const result = await service.findOne(1);
      expect(result).toEqual(mockRestaurante);
      expect(restauranteRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['platos'],
      });
    });

    it('should return null when restaurant does not exist', async () => {
      restauranteRepository.findOne?.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should successfully create a restaurant', async () => {
      const newRestaurante: Restaurante = {
        id: 1,
        nombre: 'New Restaurant',
        direccion: 'New Address',
        tipoDeCocina: 'Japonesa',
        paginaWeb: 'https://newrestaurant.com',
        platos: [],
      };
      restauranteRepository.save?.mockResolvedValue(newRestaurante);

      const result = await service.create(newRestaurante);
      expect(result).toEqual(newRestaurante);
      expect(restauranteRepository.save).toHaveBeenCalledWith(newRestaurante);
    });
  });

  describe('update', () => {
    it('should update a restaurant and return the updated entity', async () => {
      const restauranteToUpdate: Restaurante = {
        id: 1,
        nombre: 'Updated Restaurant',
        direccion: 'Updated Address',
        tipoDeCocina: 'India',
        paginaWeb: 'https://updatedrestaurant.com',
        platos: [],
      };
      const updatedRestaurante = { ...restauranteToUpdate };
      
      restauranteRepository.update?.mockResolvedValue({ affected: 1 });
      restauranteRepository.findOne?.mockResolvedValue(updatedRestaurante);

      const result = await service.update(1, restauranteToUpdate);
      expect(result).toEqual(updatedRestaurante);
      expect(restauranteRepository.update).toHaveBeenCalledWith(1, restauranteToUpdate);
      expect(restauranteRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      restauranteRepository.delete?.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(restauranteRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('addPlatoToRestaurante', () => {
    it('should add a plate to a restaurant', async () => {
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [],
      };
      
      const mockPlato: Plato = {
        id: 1,
        nombre: 'Plate 1',
        descripcion: 'Description 1',
        precio: 10.99,
        categoria: 'Appetizer',
        restaurantes: [],
      };
      
      restauranteRepository.findOne?.mockResolvedValueOnce(mockRestaurante);
      platoRepository.findOne?.mockResolvedValueOnce(mockPlato);
      
      const updatedRestaurante = {
        ...mockRestaurante,
        platos: [mockPlato],
      };
      
      restauranteRepository.save?.mockResolvedValueOnce(updatedRestaurante);
      restauranteRepository.findOne?.mockResolvedValueOnce(updatedRestaurante);

      const result = await service.addPlatoToRestaurante(1, 1);
      expect(result).toEqual(updatedRestaurante);
      expect(restauranteRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      restauranteRepository.findOne?.mockResolvedValueOnce(null);

      await expect(service.addPlatoToRestaurante(999, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when plate is not found', async () => {
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [],
      };
      
      restauranteRepository.findOne?.mockResolvedValueOnce(mockRestaurante);
      platoRepository.findOne?.mockResolvedValueOnce(null);

      await expect(service.addPlatoToRestaurante(1, 999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removePlatoFromRestaurante', () => {
    it('should remove a plate from a restaurant', async () => {
      const mockPlato: Plato = {
        id: 1,
        nombre: 'Plate 1',
        descripcion: 'Description 1',
        precio: 10.99,
        categoria: 'Appetizer',
        restaurantes: [],
      };
      
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [mockPlato],
      };
      
      restauranteRepository.findOne?.mockResolvedValueOnce(mockRestaurante);
      
      const updatedRestaurante = {
        ...mockRestaurante,
        platos: [],
      };
      
      restauranteRepository.save?.mockResolvedValueOnce(updatedRestaurante);
      restauranteRepository.findOne?.mockResolvedValueOnce(updatedRestaurante);

      const result = await service.removePlatoFromRestaurante(1, 1);
      expect(result).toEqual(updatedRestaurante);
      expect(restauranteRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      restauranteRepository.findOne?.mockResolvedValueOnce(null);

      await expect(service.removePlatoFromRestaurante(999, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateRestaurantDishes', () => {
    it('should update all plates in a restaurant', async () => {
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [],
      };
      
      const mockPlates: Plato[] = [
        {
          id: 1,
          nombre: 'Plate 1',
          descripcion: 'Description 1',
          precio: 10.99,
          categoria: 'Appetizer',
          restaurantes: [],
        },
        {
          id: 2,
          nombre: 'Plate 2',
          descripcion: 'Description 2',
          precio: 12.99,
          categoria: 'Main',
          restaurantes: [],
        },
      ];
      
      restauranteRepository.findOne?.mockResolvedValueOnce(mockRestaurante);
      platoRepository.findBy?.mockResolvedValueOnce(mockPlates);
      
      const updatedRestaurante = {
        ...mockRestaurante,
        platos: mockPlates,
      };
      
      restauranteRepository.save?.mockResolvedValueOnce(updatedRestaurante);
      restauranteRepository.findOne?.mockResolvedValueOnce(updatedRestaurante);

      const result = await service.updateRestaurantDishes(1, [1, 2]);
      expect(result).toEqual(updatedRestaurante);
      expect(platoRepository.findBy).toHaveBeenCalledWith({
        id: expect.anything(),
      });
      expect(restauranteRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      restauranteRepository.findOne?.mockResolvedValueOnce(null);

      await expect(service.updateRestaurantDishes(999, [1, 2])).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when some plates are not found', async () => {
      const mockRestaurante: Restaurante = {
        id: 1,
        nombre: 'Restaurant 1',
        direccion: 'Address 1',
        tipoDeCocina: 'Italiana',
        paginaWeb: 'https://restaurant1.com',
        platos: [],
      };
      
      const mockPlates: Plato[] = [
        {
          id: 1,
          nombre: 'Plate 1',
          descripcion: 'Description 1',
          precio: 10.99,
          categoria: 'Appetizer',
          restaurantes: [],
        },
      ];
      
      restauranteRepository.findOne?.mockResolvedValueOnce(mockRestaurante);
      platoRepository.findBy?.mockResolvedValueOnce(mockPlates);

      await expect(service.updateRestaurantDishes(1, [1, 999])).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
