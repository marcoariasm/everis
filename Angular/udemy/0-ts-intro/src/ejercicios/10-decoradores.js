"use strict";
/*
    ===== Código de TypeScript =====
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function classDecorator(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.newProperty = "new Property";
            this.hello = "override";
        }
    };
}
// Los decoradores sirven para cambiar las clases en el momento que son definidas
// Angular usa los decoradores para cambiar las cosas
let MiSuperClase = class MiSuperClase {
    constructor() {
        this.miPropiedad = 'ABC123';
    }
    imprimir() {
        console.log('Hola Mundo');
    }
};
MiSuperClase = __decorate([
    classDecorator
], MiSuperClase);
console.log(MiSuperClase);
const miClase = new MiSuperClase();
console.log(miClase.miPropiedad);
