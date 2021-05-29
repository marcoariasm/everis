define(["require", "exports", "./06-desestructuracion-funcion"], function (require, exports, _06_desestructuracion_funcion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
        ===== Código de TypeScript =====
    */
    const carritoCompras = [
        {
            desc: 'Telefono 1',
            precio: 100
        },
        {
            desc: 'Telefono 2',
            precio: 150
        }
    ]; // CTRL + .
    const [total, isv] = _06_desestructuracion_funcion_1.calculaISV(carritoCompras);
    console.log('Total: ', total);
    console.log('ISV: ', isv);
});
