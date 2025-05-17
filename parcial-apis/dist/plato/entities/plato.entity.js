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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plato = void 0;
const typeorm_1 = require("typeorm");
const restaurante_entity_1 = require("../../restaurante/entities/restaurante.entity");
let Plato = class Plato {
    id;
    nombre;
    descripcion;
    precio;
    categoria;
    restaurantes;
};
exports.Plato = Plato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plato.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plato.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plato.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Plato.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plato.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => restaurante_entity_1.Restaurante, restaurante => restaurante.platos),
    __metadata("design:type", Array)
], Plato.prototype, "restaurantes", void 0);
exports.Plato = Plato = __decorate([
    (0, typeorm_1.Entity)()
], Plato);
//# sourceMappingURL=plato.entity.js.map