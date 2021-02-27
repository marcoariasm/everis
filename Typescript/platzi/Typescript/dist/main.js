"use strict";
console.log("Hello Marco");
// Tipo: Number
var phone; // explícito
phone = 1;
phone = 3496512;
// phone = 'hola';  //Error
var phoneNumber = 3496512; // inferido
var hex = 0x838a;
var binary = 5;
var octal = 3617;
// Tipo: Boolean
var isPro; // tipado explícito
isPro = false;
isPro = true;
// isPro = 1;  // Error
var isUserPro = false; // tipado inferido o implícito
// isUserPro = 10;
// Tipo String
var cadena; // tipado explícito
cadena = "luisaviles";
cadena = "Luis";
// cadena = true; // Error
var cadena2 = "hola amigo"; // tipado inferido
cadena2 = "chau";
// Template String
var userInfo;
userInfo = "\n    User Info: " + cadena2 + "\n    username: " + cadena + " Aviles\n    phone: " + phone + "\n    isPro: " + isPro + "\n";
console.log('userInfo ->', userInfo);
