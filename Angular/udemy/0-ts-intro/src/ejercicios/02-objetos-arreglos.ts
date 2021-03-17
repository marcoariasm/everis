// let habilidades: any[] = [];
// habilidades = [1, 'ricardo', true, [], {}];


// let habilidades: (string|number)[] = [];
// habilidades = ['manuel', 'ricardo', 'bash', 5 ];


let habilidades: string[] = [];
habilidades = ['manuel', 'ricardo', 'bash', 'healing' ];




// const personaje: any = {
//     nombre: 'Srider',
//     hp: 100,
//     habilidades: ['Bash', 'Counter', 'Healing']
// }


// personaje.puebloNatal = 'Pueblo Paleta'


interface Personaje  {
    nombre: string;
    hp: number;
    habilidades: string[];
    puebloNatal?: string;  // OPCIONAL!!
}

const personaje: Personaje = {
    nombre: 'Strider',
    hp: 100,
    habilidades: habilidades
}

personaje.puebloNatal = 'Pueblo Paleta' 


console.table(personaje);