
document.addEventListener('DOMContentLoaded', () => {
    loadProdBag();
});

// ----------------------------------------------------------------------- //
// Cargamos los articulos que se encuentran en localStorage
function loadProdBag() {
    const carro = JSON.parse(localStorage.getItem('lsCarro')) || [];

    document.querySelector('#prodCarro').innerHTML = '';

    let subTotal = 0;

    if (carro.length === 0) {
        document.querySelector('#prodCarro').innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 20px;">Tu carrito está vacío. Agrega articulos desde la <a href="./tienda.html">tienda</a>.</td>
        </tr>`;
    } else {
        carro.forEach(articulo => {
            const newFila = newArticulo(articulo);
            document.querySelector('#prodCarro').innerHTML += newFila;
            subTotal += articulo.precio * articulo.cantidad.toFixed(2);
        });
    }

    updTotalBag(subTotal);

    funcEventos();
}

// ---------------------------------------------- //
// Funciones auxiliares

function newArticulo(articulo) {
    const valArtic = (articulo.precio * articulo.cantidad).toFixed(2);
    return `
        <tr>
            <td>
                <button id="${articulo.id}" class="btnBorrar"><i class="fi fi-rs-cart-minus"></i></button>
            </td>
            <td>
                <img src="${articulo.image}" alt="${articulo.modelo}" style="height: 80px; width: auto; object-fit: contain;">
            </td>
            <td>${articulo.modelocorto}</td>
            <td>$${articulo.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${articulo.cantidad}" min="1" id="${articulo.id}" class="cantArtic">
            </td>
            <td>$${valArtic}</td>
        </tr>
   `
}

function updTotalBag(subtotal) {
    document.querySelectorAll('#total').forEach(elemento => elemento.innerHTML = subtotal)
}

// ------------------------------------------------- //
// Lógica para eliminar o cambiar cantidad

function funcEventos() {

    // Boton para eliminar articulo
    document.querySelectorAll('.btnBorrar').forEach(boton => {
        boton.addEventListener('click', () => {
            const carro = JSON.parse(localStorage.getItem('lsCarro')) || [];
            const productId = parseInt(boton.id);
            const idArticulo = carro.findIndex(articulo => articulo.id === productId);
            if (idArticulo !== -1) {
                carro.splice(idArticulo, 1);
                localStorage.setItem('lsCarro', JSON.stringify(carro));
                loadProdBag();
                alert(`Artículo eliminado del carrito!`);
            }
        });
    });

    // Modificar cantidad de articulos
    document.querySelectorAll('.cantidad-articulo').forEach(input => {
        input.addEventListener('change', () => {
            const carro = JSON.parse(localStorage.getItem('lsCarro')) || [];
            const input = document.activeElement;
            const productId = parseInt(input.id);
            const newCant = parseInt(input.value);

            if (newCant < 1) {
                input.value = 1;
                return;
            }

            const articulo = carro.find(item => item.id === productId);
            if (articulo) {
                articulo.cantidad = newCant;
                localStorage.setItem('lsCarro', JSON.stringify(carro));
                updTotales();
                console.log(`Cantidad del articulo ID ${productId} actualizada a ${newCant}`);
            }
        });
    });

}

function updTotales() {
    const carro = JSON.parse(localStorage.getItem('lsCarro')) || [];
    let subTotal = 0;

    carro.forEach(articulo => {
        subTotal += articulo.precio * articulo.cantidad.toFixed(2);
    });

    const filas = document.querySelectorAll('#prodCarro tr');
    filas.forEach(fila => {
        const input = fila.querySelector('.cantArtic');
        if (input) {
            const productId = parseInt(input.id);
            const articulo = carro.find(item => item.id === productId);
            if (articulo) {
                const subtotalCelda = fila.cells[5];
                const subtotalarticulo = (articulo.precio * articulo.cantidad).toFixed(2);
                subtotalCelda.textContent = `$${subtotalarticulo}`;
            }
        }
    });

    // Actualizar el total general
    updTotalBag(subTotal);
}

