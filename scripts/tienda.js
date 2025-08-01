const API_URL = 'https://nightshift07.github.io/api/productos.json'; // URL de la API de productos
let globProd = []; // Array para almacenar los productos globalmente

async function loadApi(api) {
    try {
        const data = await fetch(api);
        if (!data.ok) {
            throw new Error(`Error en la solicitud: ${data.status}`);
        }
        globProd = await data.json(); // Guardar los productos globalmente
        return globProd;
    } catch (error) {
        console.error('Error al cargar la API:', error)
        return [];
   }
}

function showArtic(articulo){
    const dspModelo = articulo.modelo.substring(0, 45) + '...';
    return `
    <div class="producto">
        <img src="${articulo.image}" alt="${articulo.modelo}">
        <div class="producto-descripcion">
            <span>${articulo.marca}</span>
            <h5>${dspModelo}</h5>
            <h4>$ ${articulo.precio}</h4>
        </div>
        <a id="addProd${articulo.id}" class="carrito">
            <i class="fi fi-rs-cart-arrow-down"></i>
        </a>
    </div>
    `;
}

function wrtHtml(json){
    const articulos = json.map(obj => showArtic(obj));
    document.querySelector('.secProductosContent').innerHTML = articulos.join('');
    btnCarro(); // Adjuntar eventos a los botones de agregar al carrito
}

function btnCarro(){
    globProd.forEach(articulo => {
        const boton = document.getElementById(`addProd${articulo.id}`);
        if (boton) { // Asegurarse de que el botón exista
            boton.addEventListener('click', () => {
                addProdBag(articulo); // Llama a la función para agregar al carrito
            });
        }
    });
}

function addProdBag(articulo) {
    let carro = JSON.parse(localStorage.getItem('lsCarro')) || [];
    const indexArticulo = carro.findIndex(item => item.id === articulo.id);

    if (indexArticulo !== -1) {
        // Si el artículo ya está en el carrito, aumentar la cantidad
        carro[indexArticulo].cantidad += 1;
    } else {
        // Si el artículo no está en el carrito, agregarlo
        carro.push({
            id: articulo.id,
            modelo: articulo.modelo,
            modelocorto: articulo.modelo.substring(0, 20) + '...',
            precio: articulo.precio,
            image: articulo.image,
            cantidad: 1,
            stock: articulo.stock
        });
    }

    localStorage.setItem('lsCarro', JSON.stringify(carro));
    alert(`${articulo.modelo} agregado al carrito!`);
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadApi(API_URL);
    if (globProd.length > 0) {
        console.log(globProd)
        wrtHtml(globProd);
    }
});