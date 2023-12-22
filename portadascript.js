// Esperar hasta que el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', function() {
    // Cargar usuarios del JSON del LocalStorage
    const usuarios = [
        { id: 1, nombre: "Iker", apellido: "Arana", usuario: "iarana", contraseña: "1234Abcd" },
        { id: 2, nombre: "Andoni", apellido: "Larrieta", usuario: "alarrieta", contraseña: "5678Efgh" },
        { id: 3, nombre: "Jokin", apellido: "Olano", usuario: "jolano", contraseña: "9012Ijkl" }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Agregar un evento de escucha al formulario cuando se envía
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        validarUsuario(username, password);
    });
});
// validación de usuario y contraseña 
function validarUsuario(username, password) {
    //obtiene lista de usuarios de LocalStage
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    //busca usuario por el nombre de usuario
    const usuario = usuarios.find(u => u.usuario === username);

    //si encuentra el usuario y la contraseña es ok
    if (usuario && validarContraseña(password)) {
        if (usuario.contraseña === password) { //coincide
            // ir al juego
            window.location.href = 'juego.html';
        } else { //si no, mensaje
            mostrarError('La contraseña no coincide');
        }
    } else { // si no mensaje
        mostrarError('El usuario no está registrado');
    }
}
// validar contraseña
function validarContraseña(password) {
    const regex = /^[A-Za-z0-9]+$/;  //expresión que dice lo que se permite
    if (!regex.test(password)) { //si la contraseña no cumple
        mostrarError('La contraseña contiene caracteres no válidos');
        return false;
    }
    return true;
}

// Función para mostrar mensajes de error en la página
function mostrarError(mensaje) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = mensaje;
}