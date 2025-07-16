const API_URL = './api/productos.json'; // URL de la API de productos
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
    return `
    <div class="producto">
        <img src="${articulo.image}" alt="${articulo.modelo}">
        <div class="producto-descripcion">
            <span>${articulo.marca}</span>
            <h5>${articulo.modelo}</h5>
            <h4>$ ${articulo.precio}</h4>
        </div>
    </div>
    `;
}

function wrtHtml(json) {
    const articulos = json.map(obj => showArtic(obj));
    document.querySelector('.secProductosContent').innerHTML = articulos.join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadApi(API_URL); // Esperar a que se carguen los productos
    if (globProd.length > 0) {
        console.log(globProd)
        wrtHtml(globProd); // Dibujar y adjuntar eventos
    }
});