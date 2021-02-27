/*
    ===== Código de TypeScript =====
*/

export interface Producto {
    desc: string;
    precio: number
}

const tableta: Producto = {
    desc: 'Ipad A11',
    precio: 350
}

const telefono: Producto = {
    desc: 'Iphone',
    precio: 3500
}

export function calculaISV(productos: Producto[]): [number, number] {

    let total = 0;

    productos.forEach(({ precio }) => {
        total += precio;
    })

    return [total, total * 0.15];
}



const articulos = [telefono, tableta];

const [total, isv] = calculaISV(articulos);


// console.log('Total: ', total);
// console.log('ISV: ', isv);
