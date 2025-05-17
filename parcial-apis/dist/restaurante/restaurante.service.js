"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurante_entity_1 = require("./entities/restaurante.entity");
const plato_entity_1 = require("../plato/entities/plato.entity");
let RestauranteService = class RestauranteService {
    restauranteRepository;
    platoRepository;
    constructor(restauranteRepository, platoRepository) {
        this.restauranteRepository = restauranteRepository;
        this.platoRepository = platoRepository;
    }
    async findAll() {
        return this.restauranteRepository.find({ relations: ['platos'] });
    }
    async findOne(id) {
        return this.restauranteRepository.findOne({
            where: { id },
            relations: ['platos']
        });
    }
    async create(restaurante) {
        return this.restauranteRepository.save(restaurante);
    }
    async update(id, restaurante) {
        await this.restauranteRepository.update(id, restaurante);
        return this.findOne(id);
    }
    async remove(id) {
        await this.restauranteRepository.delete(id);
    }
    async addPlatoToRestaurante(restauranteId, platoId) {
        const restaurante = await this.findOne(restauranteId);
        if (!restaurante) {
            throw new common_1.NotFoundException(`Restaurante with ID ${restauranteId} not found`);
        }
        const plato = await this.platoRepository.findOne({ where: { id: platoId } });
        if (!plato) {
            throw new common_1.NotFoundException(`Plato with ID ${platoId} not found`);
        }
        if (!restaurante.platos) {
            restaurante.platos = [];
        }
        const exists = restaurante.platos.some(p => p.id === platoId);
        if (!exists) {
            restaurante.platos.push(plato);
            await this.restauranteRepository.save(restaurante);
        }
        return this.findOne(restauranteId);
    }
    async removePlatoFromRestaurante(restauranteId, platoId) {
        const restaurante = await this.findOne(restauranteId);
        if (!restaurante) {
            throw new common_1.NotFoundException(`Restaurante with ID ${restauranteId} not found`);
        }
        if (!restaurante.platos) {
            return restaurante;
        }
        restaurante.platos = restaurante.platos.filter(plato => plato.id !== platoId);
        await this.restauranteRepository.save(restaurante);
        return this.findOne(restauranteId);
    }
};
exports.RestauranteService = RestauranteService;
exports.RestauranteService = RestauranteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurante_entity_1.Restaurante)),
    __param(1, (0, typeorm_1.InjectRepository)(plato_entity_1.Plato)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestauranteService);
//# sourceMappingURL=restaurante.service.js.map