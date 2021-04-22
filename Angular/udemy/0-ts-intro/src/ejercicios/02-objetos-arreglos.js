"use strict";
// let habilidades: any[] = [];
// habilidades = [1, 'ricardo', true, [], {}];
// let habilidades: (string|number)[] = [];
// habilidades = ['manuel', 'ricardo', 'bash', 5 ];
let habilidades = [];
habilidades = ['manuel', 'ricardo', 'bash', 'healing'];
const personaje = {
    nombre: 'Strider',
    hp: 100,
    habilidades: habilidades
};
personaje.puebloNatal = 'Pueblo Paleta';
console.table(personaje);
