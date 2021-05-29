/*
    ===== Código de TypeScript =====
*/



// se declara que argumento es de Tipo   GENÉRICO poniendo por convención una letra T
// function queTipoSoy<T>(argumento: T) {
//     return argumento;
// }

// function queTipoSoy2<T>(argumento: T): string {
//     return (argumento).toString();
// }



// let soyString = queTipoSoy('Hola Mundo')
// let soyNumero = queTipoSoy(100)
// let soyArreglo = queTipoSoy([1,2,3,4,5,6])

// let soyExplicito = queTipoSoy<number>(100);


function verMiTipo<T>(argumento: T) {
    return argumento;
}

let soyBoolean = verMiTipo(true);
let soyNumber = verMiTipo(99);
let soyString = verMiTipo('¡Hola Mundo!');
