document.addEventListener('DOMContentLoaded', function () {
    const frmContacto = document.getElementsByClassName('frmContacto');
    const txtNombre = document.getElementById('frmName');
    const txtCorreo = document.getElementById('frmEmail');
    const txtMensaje = document.getElementById('frmMsg');

    // Función para manejar la visibilidad y el texto de error
    const mostrarEstadoCampo = (elementoInput, esValido, mensaje = '') => {
        const divPadre = elementoInput.parentNode;
        const txtError = divPadre.querySelector('.txtErrorFrm');

        if (esValido) {
            divPadre.classList.remove('error');
            txtError.innerText = '';
        } else {
            divPadre.classList.add('error');
            txtError.innerText = mensaje;
        }
    };

    const esCorreoValido = (email) => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(email);
    };

    const validarCampo = (campo, mensajeVacio, mensajeInvalido = '') => {
        const valor = campo.value.trim();
        if (valor === '') {
            mostrarEstadoCampo(campo, false, mensajeVacio);
            return false;
        } else if (campo.id === 'frmEmail' && !esCorreoValido(valor)) {
            mostrarEstadoCampo(campo, false, mensajeInvalido);
            return false;
        } else {
            mostrarEstadoCampo(campo, true);
            return true;
        }
    };

    txtCorreo.addEventListener('change', () => {
        validarCampo(txtCorreo, 'El correo electrónico es obligatorio', 'Ingresa un correo electrónico válido.');
    });

   
    // agrega el evento 'change' a todos los campos
    [txtNombre, txtCorreo, txtMensaje].forEach(campo => {
        campo.addEventListener('change', () => {
            if (campo.id === 'txtCorreo') {
                validarCampo(txtCorreo, 'El correo electrónico es obligatorio', 'Ingresa un correo electrónico válido.');
            } else if (campo.id === 'txtNombre') {
                validarCampo(txtNombre, 'Por favor, ingresa tu nombre.');
            } else if (campo.id === 'txtMensaje') {
                validarCampo(txtMensaje, 'Por favor, ingresa tu mensaje.');
            }
        });

    });



    // Escuchador de evento 'submit' del formulario
    formularioContacto.addEventListener('submit', function (evento) {
        evento.preventDefault(); // Evita el envío del formulario por defecto

        const camposAValidar = [
            { elemento: txtNombre, mensajeVacio: 'Por favor, ingresa tu nombre.' },
            { elemento: txtCorreo, mensajeVacio: 'Por favor, ingresa un correo electronico.', mensajeInvalido: 'Ingresa un correo electrónico válido.' },
            { elemento: txtMensaje, mensajeVacio: 'Por favor, ingresa tu mensaje.' }
        ];

        let formularioEsValido = true; // Asumimos que es válido al principio

        // Itera sobre cada campo y ejecuta la validación
        // Si 'validarCampo' retorna false, significa que hay un error y actualizamos formularioEsValido
        camposAValidar.forEach(campoInfo => {
            // La función validarCampo se encarga de mostrar/ocultar el error.
            // Si esCampoValido es falso, significa que hubo un error en ese campo.
            const esCampoValido = validarCampo(campoInfo.elemento, campoInfo.mensajeVacio, campoInfo.mensajeInvalido);
            if (!esCampoValido) {
                formularioEsValido = false; // Marcamos el formulario como inválido si al menos un campo falla
            }
        });

        if (formularioEsValido) {
            console.log('¡Formulario enviado con éxito!');
            // Aquí puedes añadir la lógica para enviar el formulario (por ejemplo, con fetch API)
            formularioContacto.reset(); // Resetea el formulario
        } else {
            console.log('El formulario no es válido. Por favor, revisa los campos.');
        }
    });

});