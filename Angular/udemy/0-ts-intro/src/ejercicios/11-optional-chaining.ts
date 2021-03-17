/*
    ===== Código de TypeScript =====
*/


// el signo de interrogacion tiene varios significados en Typescript


interface Pasajero {
    nombre: string;
    hijos?: string[]
}

const pasajero1: Pasajero = {
    nombre: 'Fernando'
}

const pasajero2: Pasajero = {
    nombre: 'Melissa',
    hijos: ['Natalia', 'Gabriel']
}

function imprimeHijos( pasajero: Pasajero): void {
    const cuantosHijos = pasajero.hijos?.length || 0; // *** encadenamiento opcional  SECURE OPERATOR

    console.log (cuantosHijos);
}

imprimeHijos(pasajero2);

imprimeHijos(pasajero1);