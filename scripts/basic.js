const codeHeader =`
    <a href="./index.html"><img class="logo" src="img/logo_100.png" alt="logo"></a>
    <div>
        <ul class="navBar" id="navBar">
            <li><a href="./index.html"><i class="fi fi-rs-home-location-alt"></i> - Nosotros</a></li>
            <li><a href="./tienda.html"><i class="fi fi-rs-shop"></i> - Productos</a></li>
            <li><a href="./contacto.html"><i class="fi fi-rs-phone-guide"></i> - Contacto</a></li>
            <li><a href="./carrito.html"><i class="fi fi-rs-shopping-cart-check"></i> - Carrito</a></li>
        </ul>
    </div>
    `;
document.querySelector('.pagHeader').innerHTML = codeHeader;

const codeFooter = `
    <div>
        <p>Desarrollado por <a href="https://github.com/NightShift07">NightShift07</a></p>
        <p>Todos los derechos reservados. &copy; 2023</p>
    </div>
    `;
document.querySelector('.pagFooter').innerHTML = codeFooter;
