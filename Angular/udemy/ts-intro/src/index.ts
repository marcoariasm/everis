/*
    ===== Código de TypeScript =====
*/


class Heroe {
    private alterEgo: string;
    public edad: number;
    static nombreReal: number;    // puedo acceder a su valor sin crear una instancia de la clase
}




const ironman = new Heroe();

console.log(ironman);

// ironman.