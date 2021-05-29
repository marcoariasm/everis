"use strict";
const superHeroe = {
    nombre: 'Spiderman',
    edad: 30,
    direccion: {
        calle: 'Main st',
        pais: 'USA',
        ciudad: 'NY'
    },
    mostrarDireccion() {
        return this.nombre + ', ' + this.direccion.ciudad + ', ' + this.direccion.pais;
    }
};
// const direccion = superHeroe.mostrarDireccion();
// console.log(direccion);
console.log(superHeroe.mostrarDireccion());
