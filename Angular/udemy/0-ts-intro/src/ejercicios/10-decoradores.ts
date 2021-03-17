/*
    ===== Código de TypeScript =====
*/

function classDecorator<T extends { new (...args: any[]): {}}> (
    constructor: T
) {
    return class extends constructor {
        newProperty = "new Property";
        hello = "override";
    };
}



// Los decoradores sirven para cambiar las clases en el momento que son definidas
// Angular usa los decoradores para cambiar las cosas

@classDecorator
class MiSuperClase {
    public miPropiedad: string = 'ABC123';

    imprimir() {
        console.log('Hola Mundo');
    }
}

console.log(MiSuperClase);


const miClase = new MiSuperClase();

console.log(miClase.miPropiedad);
