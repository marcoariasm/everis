/*
    ===== Código de TypeScript =====
*/

interface Reproductor {
    volumen: number;
    segundo: number;
    cancion: string;
    detalles: Detalles
}

interface Detalles {
    autor: string;
    anio: number;
}

const reproductor: Reproductor = {
    volumen: 30,
    segundo: 36,
    cancion: "This is your life",
    detalles: {
        autor: "The Killers",
        anio: 2004
    }
}

// const { volumen, segundo, cancion, detalles } = reproductor
// const { autor } = detalles;

const { volumen, segundo, cancion, detalles: { autor: autorDetalle } } = reproductor


console.log('El volumen actual es: ',volumen);
console.log('El segundo actual es: ',segundo);
console.log('La canción actual es: ',cancion);
console.log('El autor actual es: ',autorDetalle);




// DESTRUCTURACIÓN DE ARREGLOS

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

// const [goku, vegeta, trunks] = dbz;
const [ , , trunks] = dbz;

// console.log('Personaje 1: ',goku)
// console.log('Personaje 2: ',vegeta)
console.log('Personaje 3: ',trunks)
