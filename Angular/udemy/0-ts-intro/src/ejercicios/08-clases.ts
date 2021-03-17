/*
    ===== Código de TypeScript =====
*/

import { isRegularExpressionLiteral } from "typescript";


// class Heroe {
//     // private alterEgo: string;
//     // public edad: number;
//     // static nombreReal: number;    // puedo acceder a su valor sin crear una instancia de la clase
//     alterEgo: string;
//     edad: number;
//     nombreReal: number;    // puedo acceder a su valor sin crear una instancia de la clase

//     imprimirNombre() {
//         return this.alterEgo + ' ' + this.nombreReal;
//     }
// }

// En JS no existen las interfaces
// Si existen las clases

// Clases e interfaces lucen casi isRegularExpressionLiteral,
// las clases sirven para crear instancias



interface Personaje2  {
    nombre?: string;
    hp?: number;
    habilidades?: string[];
    puebloNatal?: string;  // OPCIONAL!!
}


// class Heroe {
//     public alterEgo: string;
//     public edad: number;
//     public nombreReal: number;    // puedo acceder a su valor sin crear una instancia de la clase

//     constructor( alterEgo: string, edad: number, nombreReal: number) {
//         this.alterEgo = alterEgo;
//         this.edad = edad;
//         this.nombreReal = nombreReal;
//     }
// }


// *** FORMA CORTA DE DECLARAR CLASES Y SUS CONSTRUCTORES

class Heroe {
    // alterEgo: string;
    // edad: number;
    // nombreReal: number;    // puedo acceder a su valor sin crear una instancia de la clase

    constructor(
        public alterEgo: string,  // esto sería la inyección de dependencias de Angular
        public edad: number,
        public nombreReal: string
    ) {}
}




// const ironman = new Heroe('Ironman');
const spiderman:  Personaje2 = {}


const ironman = new Heroe('Ironman', 45, 'Tony');
console.log(ironman);

// ironman.





class PersonaNormal {
    nombre: string;
    direccion: string;

    constructor ( nombre: string, direccion: string ){
        this.nombre = nombre;
        this.direccion = direccion;
    }
}


class PersonaNormal2 {
    
    constructor(
        public nombre: string,
        public direccion: string
        ) {}
    }
    
    class Heroe2 extends PersonaNormal {
        
        constructor (
        public alterEgo2: string,
        public edad2: number,
        public nombreReal2: string
        ){ 
            super( nombreReal2, 'New York, USA');
        }
    }
    
const ironman2 = new Heroe2('Ironman', 45, 'Tony');
console.log(ironman2);
