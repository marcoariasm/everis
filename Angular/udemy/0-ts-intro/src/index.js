"use strict";
/*
    ===== Código de TypeScript =====
*/
// se declara que argumento es de Tipo   GENÉRICO poniendo por convención una letra T
function queTipoSoy(argumento) {
    return argumento;
}
let soyString = queTipoSoy('Hola Mundo');
let soyNumero = queTipoSoy(100);
let soyArreglo = queTipoSoy([1, 2, 3, 4, 5, 6]);
let soyExplicito = queTipoSoy(100);
