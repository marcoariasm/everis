/*
    ===== Código de TypeScript =====
*/

// function sumar(a: number, b: number): number {
//     return a + b;
// }

// const resultado = sumar(10, 20);


const sumarFlecha = (a: number, b: number): number => {
    return a + b;
}

// const resultado = sumarFlecha(10, 20);




// Orden de argumentos:   1 Obligatorios    2 Opcionales  3 por defecto
function multiplicar(numero: number, base?: number, otroNumero: number = 2): number {
    return numero * base;
}
// function multiplicar(numero: number, base: number, otroNumero: number = 2): number {
//     return numero * base;
// }




// Si no se retorna nada se pone  void   y retorno de   undefined

function curar(): void {
    return undefined
}


// LAS INTERFACES SON COMO CLASES TONTAS

interface PersonajeLOR {
    nombre: string;
    pv: number;
    mostrarHP: () => void;   //  DEFINIENDO FUNCIONES !!!
    // mostrarHP: (a:number, b:string, c:boolean) => void;
}


function sanar(personaje: PersonajeLOR, curarX):void {
    personaje.pv += curarX;

    console.log(personaje);
}

const nuevoPersonaje: PersonajeLOR = {
    nombre: 'Strider',
    pv: 50,
    mostrarHP() {
        console.log('Puntos de vida:', this.pv)
    }
}

sanar(nuevoPersonaje, 20)

console.log(nuevoPersonaje);

nuevoPersonaje.mostrarHP();


const resultado = multiplicar(10, 5, 5);


console.log(resultado);


