'use-strict';

//  esperar hasta que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('cuadricula');//coge cuadrícula del DOM
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 11; j++) {
            let square = document.createElement('div');//un div para cada cuadro
            square.classList.add('cuadro');//añade clase cuadro al div
            grid.appendChild(square);//añade el cuadro a la cuadrícula
        }
    }
});


// El resto del código jQuery se ejecutará una vez que el DOM esté listo
$(document).ready(function() {
    let selectedColor = ''; //variable que almacena el color seleccionad
    let seconds = 0; //variable contador de segundos
    let timerStarted = false;  //indica si el temporizador está en marcha
    let timer;

    // Función para iniciar el contador de segundos
    function startTimer() {
        if (!timerStarted) {
            timer = setInterval(function() {
                seconds++;
                $('#clickCounter').text(seconds);//actualiza contador
            }, 1000); //intervalo de actualización cada segundo (1000 milisegundos)
            timerStarted = true;
        }
    }
// Función para detener el contador de tiempo
function stopTimer() {
    if (timerStarted) {
        clearInterval(timer);
        timerStarted = false;
    }
}

    // Función para resetear el estilo de los botones
    function resetButtonStyles() {
        $('.boton').css('border', '1px solid black');
    }

    // Evento doble click en cualquier botón de color
    $('.boton').dblclick(function() {
        resetButtonStyles();//restablece estilo de los botones
        $(this).css('border', '15px solid green'); // Borde más grueso y verde para el seleccionado
        selectedColor = this.id.replace('color', '').toLowerCase();
        startTimer();//inicia contador
    });

    // Evento click para pintar en la cuadrícula
    $('.cuadro').click(function() {
        if (selectedColor) {
            $(this).css('background-color', selectedColor);//cambia color del fondo
        }
    });

 // Evento click en la imagen que detiene el contador
 $('.imagen').click(function() {
    stopTimer();
});

  // Evento cursador abandona imagen. Lanza alerta del tiempo que ha pasado
  $('.imagen').mouseout(function() {
    if (!timerStarted) {
        alert("¡Zorionak! Lo has hecho en " + seconds + " segundos!!!");
    }
});

    // Evento mouseover para mostrar instrucciones de juego cuando se pasa por el nombre del juego
    $('#nombreJuego').mouseover(function() {
        alert("¡Copia la figura lo más rápido posible, selecciona el color con doble click y pinta los cuadrados con un click. Cuando hayas terminado vuelve al Smile.¡Corre que los segundos cuentan!");
    });
});