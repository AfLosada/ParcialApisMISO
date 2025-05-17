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
exports.Restaurante = void 0;
const plato_entity_1 = require("../../plato/entities/plato.entity");
const typeorm_1 = require("typeorm");
let Restaurante = class Restaurante {
    id;
    nombre;
    direccion;
    tipoDeCocina;
    paginaWeb;
    platos;
};
exports.Restaurante = Restaurante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Restaurante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurante.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurante.prototype, "tipoDeCocina", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurante.prototype, "paginaWeb", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => plato_entity_1.Plato, plato => plato.restaurantes),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Restaurante.prototype, "platos", void 0);
exports.Restaurante = Restaurante = __decorate([
    (0, typeorm_1.Entity)()
], Restaurante);
//# sourceMappingURL=restaurante.entity.js.map