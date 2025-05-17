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
exports.RestaurantePlatoController = void 0;
const common_1 = require("@nestjs/common");
const restaurante_service_1 = require("./restaurante.service");
const plato_service_1 = require("../plato/plato.service");
let RestaurantePlatoController = class RestaurantePlatoController {
    restauranteService;
    platoService;
    constructor(restauranteService, platoService) {
        this.restauranteService = restauranteService;
        this.platoService = platoService;
    }
    async findPlatosByRestaurante(restauranteId) {
        const restaurante = await this.restauranteService.findOne(+restauranteId);
        if (!restaurante) {
            throw new common_1.NotFoundException(`Restaurante with ID ${restauranteId} not found`);
        }
        return restaurante.platos;
    }
    async findPlatoInRestaurante(restauranteId, platoId) {
        const restaurante = await this.restauranteService.findOne(+restauranteId);
        if (!restaurante) {
            throw new common_1.NotFoundException(`Restaurante with ID ${restauranteId} not found`);
        }
        const plato = restaurante.platos.find(plato => plato.id === +platoId);
        if (!plato) {
            throw new common_1.NotFoundException(`Plato with ID ${platoId} not found in restaurant ${restauranteId}`);
        }
        return plato;
    }
    async addPlatoToRestaurante(restauranteId, platoId) {
        return this.restauranteService.addPlatoToRestaurante(+restauranteId, +platoId);
    }
    async removePlatoFromRestaurante(restauranteId, platoId) {
        return this.restauranteService.removePlatoFromRestaurante(+restauranteId, +platoId);
    }
};
exports.RestaurantePlatoController = RestaurantePlatoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantePlatoController.prototype, "findPlatosByRestaurante", null);
__decorate([
    (0, common_1.Get)(':platoId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('platoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestaurantePlatoController.prototype, "findPlatoInRestaurante", null);
__decorate([
    (0, common_1.Post)(':platoId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('platoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestaurantePlatoController.prototype, "addPlatoToRestaurante", null);
__decorate([
    (0, common_1.Delete)(':platoId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('platoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestaurantePlatoController.prototype, "removePlatoFromRestaurante", null);
exports.RestaurantePlatoController = RestaurantePlatoController = __decorate([
    (0, common_1.Controller)('restaurantes/:restauranteId/platos'),
    __metadata("design:paramtypes", [restaurante_service_1.RestauranteService,
        plato_service_1.PlatoService])
], RestaurantePlatoController);
//# sourceMappingURL=restaurante-plato.controller.js.map