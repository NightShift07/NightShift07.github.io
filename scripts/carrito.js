
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
            subTotal += articulo.precio * articulo.cantidad;
        });
    }

    updTotal(subTotal);

    eventosFila();
}

// ---------------------------------------------- //
// Funciones auxiliares

function newArticulo(articulo) {

    const valArtic = (articulo.precio * articulo.cantidad);
    console.log(articulo.precio, articulo.cantidad, valArtic);
    return `
        <tr>
            <td>
                <button id="${articulo.id}" class="remove-btn"><i class="fi fi-rs-cart-minus"></i></button>
            </td>
            <td>
                <img src="${articulo.image}" alt="${articulo.modelo}" style="height: 80px; width: auto; object-fit: contain;">
            </td>
            <td>${articulo.modelocorto}</td>
            <td>$${articulo.precio}</td>
            <td>
                <input type="number" value="${articulo.cantidad}" min="1" id="${articulo.id}" class="cantidad-articulo">
            </td>
            <td>$${valArtic}</td>
        </tr>
   `
}

function updTotal(subtotal) {
    document.querySelectorAll('#total').forEach(elemento => elemento.innerHTML = subtotal)
}

// ------------------------------------------------- //
// Lógica para eliminar o cambiar cantidad

function eventosFila() {

    // Eventos para botones de eliminar
    //const botonesEliminar = document.querySelectorAll('.remove-btn');
    document.querySelectorAll('.remove-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtenemos el carrito
            const carrito = JSON.parse(localStorage.getItem('lsCarro')) || [];
            //obtenemos el id del boton
            const productId = parseInt(boton.id);
            // Encontrar el índice del articulo en el carrito
            const indicearticulo = carrito.findIndex(articulo => articulo.id === productId);
            //console.log(indicearticulo)
            if (indicearticulo !== -1) {
                // Eliminar el articulo del array
                carrito.splice(indicearticulo, 1);

                // Actualizar localStorage
                localStorage.setItem('lsCarro', JSON.stringify(carrito));

                // Recargar la vista del carrito
                cargararticulosCarrito();

                console.log(`articulo con ID ${productId} eliminado del carrito`);
            }

        });
    });


    // Eventos para cambiar cantidad

    document.querySelectorAll('.cantidad-articulo').forEach(input => {
        input.addEventListener('change', () => {
            // Obtenemos el carrito
            const carrito = JSON.parse(localStorage.getItem('lsCarro')) || [];
            // Obtener el input que fue modificado
            const input = document.activeElement;
            const productId = parseInt(input.id);
            const nuevaCantidad = parseInt(input.value);

            // Validar que la cantidad sea válida
            if (nuevaCantidad < 1) {
                input.value = 1;
                return;
            }

            // Encontrar el articulo en el carrito
            const articulo = carrito.find(item => item.id === productId);

            if (articulo) {
                // Actualizar la cantidad
                articulo.cantidad = nuevaCantidad;

                // Actualizar localStorage
                localStorage.setItem('lsCarro', JSON.stringify(carrito));

                // Recalcular y actualizar solo los totales (sin recargar toda la tabla)
                actualizarTotales();

                console.log(`Cantidad del articulo ID ${productId} actualizada a ${nuevaCantidad}`);
            }
        });
    });

}

function actualizarTotales() {
    // Obtenemos el carrito
    const carrito = JSON.parse(localStorage.getItem('lsCarro')) || [];
    let subTotal = 0;

    // Recalcular subtotal
    carrito.forEach(articulo => {
        subTotal += articulo.price * articulo.cantidad;
    });

    // Actualizar subtotales individuales en la tabla
    const filas = document.querySelectorAll('#prodCarro tr');
    filas.forEach(fila => {
        const input = fila.querySelector('.cantidad-articulo');
        if (input) {
            const productId = parseInt(input.id);
            const articulo = carrito.find(item => item.id === productId);
            if (articulo) {
                const subtotalCelda = fila.cells[5]; // La celda del subtotal es la sexta (índice 5)
                const subtotalarticulo = (articulo.price * articulo.cantidad).toFixed(2);
                subtotalCelda.textContent = `$${subtotalarticulo}`;
            }
        }
    });

    // Actualizar el total general
    updTotal(subTotal);
}

