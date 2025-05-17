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
exports.RestauranteController = void 0;
const common_1 = require("@nestjs/common");
const restaurante_service_1 = require("./restaurante.service");
const create_restaurante_dto_1 = require("./dto/create-restaurante.dto");
const update_restaurante_dto_1 = require("./dto/update-restaurante.dto");
const restaurante_entity_1 = require("./entities/restaurante.entity");
let RestauranteController = class RestauranteController {
    restauranteService;
    constructor(restauranteService) {
        this.restauranteService = restauranteService;
    }
    create(createRestauranteDto) {
        const restaurante = new restaurante_entity_1.Restaurante();
        restaurante.nombre = createRestauranteDto.nombre;
        restaurante.direccion = createRestauranteDto.direccion;
        restaurante.tipoDeCocina = createRestauranteDto.tipoDeCocina;
        restaurante.paginaWeb = createRestauranteDto.paginaWeb;
        return this.restauranteService.create(restaurante);
    }
    findAll() {
        return this.restauranteService.findAll();
    }
    findOne(id) {
        return this.restauranteService.findOne(+id);
    }
    update(id, updateRestauranteDto) {
        const restaurante = new restaurante_entity_1.Restaurante();
        if (updateRestauranteDto.nombre)
            restaurante.nombre = updateRestauranteDto.nombre;
        if (updateRestauranteDto.direccion)
            restaurante.direccion = updateRestauranteDto.direccion;
        if (updateRestauranteDto.tipoDeCocina)
            restaurante.tipoDeCocina = updateRestauranteDto.tipoDeCocina;
        if (updateRestauranteDto.paginaWeb)
            restaurante.paginaWeb = updateRestauranteDto.paginaWeb;
        return this.restauranteService.update(+id, restaurante);
    }
    remove(id) {
        return this.restauranteService.remove(+id);
    }
};
exports.RestauranteController = RestauranteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurante_dto_1.CreateRestauranteDto]),
    __metadata("design:returntype", void 0)
], RestauranteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestauranteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestauranteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurante_dto_1.UpdateRestauranteDto]),
    __metadata("design:returntype", void 0)
], RestauranteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestauranteController.prototype, "remove", null);
exports.RestauranteController = RestauranteController = __decorate([
    (0, common_1.Controller)('restaurantes'),
    __metadata("design:paramtypes", [restaurante_service_1.RestauranteService])
], RestauranteController);
//# sourceMappingURL=restaurante.controller.js.map