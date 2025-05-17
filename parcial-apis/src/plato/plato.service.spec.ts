import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatoService } from './plato.service';
import { Plato } from './entities/plato.entity';

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
});

describe('PlatoService', () => {
  let service: PlatoService;
  let platoRepository: MockRepository<Plato>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatoService,
        {
          provide: getRepositoryToken(Plato),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PlatoService>(PlatoService);
    platoRepository = module.get<MockRepository<Plato>>(
      getRepositoryToken(Plato),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plates', async () => {
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
      platoRepository.find?.mockResolvedValue(mockPlates);

      const result = await service.findAll();
      expect(result).toEqual(mockPlates);
      expect(platoRepository.find).toHaveBeenCalledWith({
        relations: ['restaurantes'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a plate when it exists', async () => {
      const mockPlate: Plato = {
        id: 1,
        nombre: 'Plate 1',
        descripcion: 'Description 1',
        precio: 10.99,
        categoria: 'Appetizer',
        restaurantes: [],
      };
      platoRepository.findOne?.mockResolvedValue(mockPlate);

      const result = await service.findOne(1);
      expect(result).toEqual(mockPlate);
      expect(platoRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['restaurantes'],
      });
    });

    it('should return null when plate does not exist', async () => {
      platoRepository.findOne?.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should successfully create a plate', async () => {
      const newPlate: Plato = {
        id: 1,
        nombre: 'New Plate',
        descripcion: 'New Description',
        precio: 15.99,
        categoria: 'Dessert',
        restaurantes: [],
      };
      platoRepository.save?.mockResolvedValue(newPlate);

      const result = await service.create(newPlate);
      expect(result).toEqual(newPlate);
      expect(platoRepository.save).toHaveBeenCalledWith(newPlate);
    });
  });

  describe('update', () => {
    it('should update a plate and return the updated entity', async () => {
      const plateToUpdate: Plato = {
        id: 1,
        nombre: 'Updated Plate',
        descripcion: 'Updated Description',
        precio: 18.99,
        categoria: 'Updated Category',
        restaurantes: [],
      };
      const updatedPlate = { ...plateToUpdate };
      
      platoRepository.update?.mockResolvedValue({ affected: 1 });
      platoRepository.findOne?.mockResolvedValue(updatedPlate);

      const result = await service.update(1, plateToUpdate);
      expect(result).toEqual(updatedPlate);
      expect(platoRepository.update).toHaveBeenCalledWith(1, plateToUpdate);
      expect(platoRepository.findOne).toHaveBeenCalled();
    });

    it('should return null when updating a non-existent plate', async () => {
      const plateToUpdate: Plato = {
        id: 999,
        nombre: 'Non-existent Plate',
        descripcion: 'This plate does not exist',
        precio: 0,
        categoria: 'None',
        restaurantes: [],
      };
      
      platoRepository.update?.mockResolvedValue({ affected: 0 });
      platoRepository.findOne?.mockResolvedValue(null);

      const result = await service.update(999, plateToUpdate);
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a plate', async () => {
      platoRepository.delete?.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(platoRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
