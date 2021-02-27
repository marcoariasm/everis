console.log("Hello Marco");

// Tipo: Number
let phone: number;    // explícito
phone = 1;
phone = 3496512;
// phone = 'hola';  //Error

let phoneNumber = 3496512   // inferido


let hex: number = 0x838a;
let binary: number = 0b0101;
let octal: number = 0o7041;



// Tipo: Boolean
let  isPro: boolean; // tipado explícito
isPro = false;
isPro = true;
// isPro = 1;  // Error

let isUserPro = false;  // tipado inferido o implícito
// isUserPro = 10;



// Tipo String
let cadena : String;  // tipado explícito
cadena = "luisaviles";
cadena = "Luis";
// cadena = true; // Error

let cadena2 =  "hola amigo";  // tipado inferido
cadena2 = "chau";

// Template String
let userInfo: string;
userInfo = `
    User Info: ${cadena2}
    username: ${cadena} Aviles
    phone: ${phone}
    isPro: ${isPro}
`

console.log('userInfo ->', userInfo);