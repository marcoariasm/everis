"use strict";
/*
    ===== Código de TypeScript =====
*/
// function sumar(a: number, b: number): number {
//     return a + b;
// }
// const resultado = sumar(10, 20);
const sumarFlecha = (a, b) => {
    return a + b;
};
// const resultado = sumarFlecha(10, 20);
// Orden de argumentos:   1 Obligatorios    2 Opcionales  3 por defecto
function multiplicar(numero, base, otroNumero = 2) {
    return numero * base;
}
// function multiplicar(numero: number, base: number, otroNumero: number = 2): number {
//     return numero * base;
// }
// Si no se retorna nada se pone  void   y retorno de   undefined
function curar() {
    return undefined;
}
function sanar(personaje, curarX) {
    personaje.pv += curarX;
    console.log(personaje);
}
const nuevoPersonaje = {
    nombre: 'Strider',
    pv: 50,
    mostrarHP() {
        console.log('Puntos de vida:', this.pv);
    }
};
sanar(nuevoPersonaje, 20);
console.log(nuevoPersonaje);
nuevoPersonaje.mostrarHP();
const resultado = multiplicar(10, 5, 5);
console.log(resultado);
