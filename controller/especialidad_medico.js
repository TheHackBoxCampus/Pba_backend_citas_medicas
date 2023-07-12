var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Expose } from "class-transformer";
class especialidad {
    constructor(esp) {
        this.esp = esp;
    }
}
__decorate([
    Expose({ name: "especialidad" }),
    Transform(({ value }) => {
        if (typeof value != "string")
            throw ({ status: 500, message: "Parametros incorectos" });
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], especialidad.prototype, "esp", void 0);
export default especialidad;
