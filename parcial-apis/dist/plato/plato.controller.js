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
exports.PlatoController = void 0;
const common_1 = require("@nestjs/common");
const plato_service_1 = require("./plato.service");
const create_plato_dto_1 = require("./dto/create-plato.dto");
const update_plato_dto_1 = require("./dto/update-plato.dto");
const plato_entity_1 = require("./entities/plato.entity");
let PlatoController = class PlatoController {
    platoService;
    constructor(platoService) {
        this.platoService = platoService;
    }
    create(createPlatoDto) {
        const plato = new plato_entity_1.Plato();
        plato.nombre = createPlatoDto.nombre;
        plato.descripcion = createPlatoDto.descripcion;
        plato.precio = createPlatoDto.precio;
        plato.categoria = createPlatoDto.categoria;
        return this.platoService.create(plato);
    }
    findAll() {
        return this.platoService.findAll();
    }
    findOne(id) {
        return this.platoService.findOne(+id);
    }
    update(id, updatePlatoDto) {
        const plato = new plato_entity_1.Plato();
        if (updatePlatoDto.nombre)
            plato.nombre = updatePlatoDto.nombre;
        if (updatePlatoDto.descripcion)
            plato.descripcion = updatePlatoDto.descripcion;
        if (updatePlatoDto.precio)
            plato.precio = updatePlatoDto.precio;
        if (updatePlatoDto.categoria)
            plato.categoria = updatePlatoDto.categoria;
        return this.platoService.update(+id, plato);
    }
    remove(id) {
        return this.platoService.remove(+id);
    }
};
exports.PlatoController = PlatoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plato_dto_1.CreatePlatoDto]),
    __metadata("design:returntype", void 0)
], PlatoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlatoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_plato_dto_1.UpdatePlatoDto]),
    __metadata("design:returntype", void 0)
], PlatoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatoController.prototype, "remove", null);
exports.PlatoController = PlatoController = __decorate([
    (0, common_1.Controller)('platos'),
    __metadata("design:paramtypes", [plato_service_1.PlatoService])
], PlatoController);
//# sourceMappingURL=plato.controller.js.map