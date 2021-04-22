"use strict";
/*
    ===== Código de TypeScript =====
*/
const pasajero1 = {
    nombre: 'Fernando'
};
const pasajero2 = {
    nombre: 'Melissa',
    hijos: ['Natalia', 'Gabriel']
};
function imprimeHijos(pasajero) {
    var _a;
    const cuantosHijos = ((_a = pasajero.hijos) === null || _a === void 0 ? void 0 : _a.length) || 0; // *** encadenamiento opcional  SECURE OPERATOR
    console.log(cuantosHijos);
}
imprimeHijos(pasajero2);
imprimeHijos(pasajero1);
