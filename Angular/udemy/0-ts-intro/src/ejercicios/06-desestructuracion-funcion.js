/*
    ===== Código de TypeScript =====
*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calculaISV = void 0;
    const tableta = {
        desc: 'Ipad A11',
        precio: 350
    };
    const telefono = {
        desc: 'Iphone',
        precio: 3500
    };
    function calculaISV(productos) {
        let total = 0;
        productos.forEach(({ precio }) => {
            total += precio;
        });
        return [total, total * 0.15];
    }
    exports.calculaISV = calculaISV;
    const articulos = [telefono, tableta];
    const [total, isv] = calculaISV(articulos);
});
// console.log('Total: ', total);
// console.log('ISV: ', isv);
