/*
    ===== Código de TypeScript =====
*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        constructor(alterEgo, // esto sería la inyección de dependencias de Angular
        edad, nombreReal) {
            this.alterEgo = alterEgo;
            this.edad = edad;
            this.nombreReal = nombreReal;
        }
    }
    // const ironman = new Heroe('Ironman');
    const spiderman = {};
    const ironman = new Heroe('Ironman', 45, 'Tony');
    console.log(ironman);
    // ironman.
    class PersonaNormal {
        constructor(nombre, direccion) {
            this.nombre = nombre;
            this.direccion = direccion;
        }
    }
    class PersonaNormal2 {
        constructor(nombre, direccion) {
            this.nombre = nombre;
            this.direccion = direccion;
        }
    }
    class Heroe2 extends PersonaNormal {
        constructor(alterEgo2, edad2, nombreReal2) {
            super(nombreReal2, 'New York, USA');
            this.alterEgo2 = alterEgo2;
            this.edad2 = edad2;
            this.nombreReal2 = nombreReal2;
        }
    }
    const ironman2 = new Heroe2('Ironman', 45, 'Tony');
    console.log(ironman2);
});
