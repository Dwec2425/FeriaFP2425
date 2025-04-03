// Crear una constante para tener la imagen de fondo
const tierra = document.getElementById('contenedor');

let contador = document.getElementById("contador");

let segundos = 0;
let minutos = 0;
let horas = 0;

let intervalId;


// Crear las hormigas con clases
class Hormiga {
    constructor() {
        this.hormiga = document.createElement("img");
        this.hormiga.className = "hormiga";
        this.hormiga.src = "img/hormigaNegraDerecha.png";
        tierra.appendChild(this.hormiga);

        // Para que las hormigas vayan apareciendo de manera aleatoria sobre la imagen de fondo
        this.positionRandom();

        // Iniciar contador y dirección en la clase hormiga para que cada hormiga tenga su propio contador y su propia dirección
        this.contador = 0;
        this.direccionAleatoria = Math.floor(Math.random() * 4);
        this.isRoja = false; // para saber si la hormiga es roja
        this.isMarron = false;
        this.isSangre = false;

        this.cuentaClick = 0;

        this.isMoving = true;

        this.hormiga.addEventListener('click', (event) => {
            this.cuentaClick++;

            if (this.cuentaClick == 1) {
                if (!this.isMarron) { // Solo cambiar si no es marron
                    this.isMarron = true; // Marcar como marron
                    this.hormiga.src = "img/hormigaMarronDerecha.png";
                }
            } else if (this.cuentaClick == 2) {
                if (!this.isRoja) {
                    this.isRoja = true;
                    this.hormiga.src = "img/hormigaRojaDerecha.png";
                    // para que la hormiga se quede de color roja
                    this.isMarron = false;
                }
            } else if (this.cuentaClick == 3) {
                if (!this.isSangre) {
                    this.isSangre = true;
                    this.hormiga.src = "img/sangre.png";
                    this.hormiga.style.width = 30 + "px";
                    this.hormiga.style.height = 30 + "px";
                    this.isRoja = false;

                    this.isMoving = false;
                }
            }
            // si una hormiga se convierte en sangre se llama a la función verificarVictoria
            if (this.isSangre) {
                verificarVictoria(); // Llamar a la función verificarVictoria desde el contexto global
            }
        });
    }

    positionRandom() {
        const randomX = Math.random() * (tierra.clientWidth - 30); // 30 es el ancho de la hormiga
        const randomY = Math.random() * (tierra.clientHeight - 15); // 15 es la altura de la hormiga
        this.hormiga.style.left = `${randomX}px`;
        this.hormiga.style.top = `${randomY}px`;
    }

    mover() {
        if (!this.isMoving) return;

        const arrayDireccion = [1, 2, 3, 4];

        let currentTop = parseInt(this.hormiga.style.top);
        let currentLeft = parseInt(this.hormiga.style.left);

        // Distancia que van a recorrer las hormigas en cada movimiento
        const Distancia = 5;

        this.contador++;

        // Las hormigas se van a mover en la misma dirección al menos 20 veces antes de cambiar de dirección
        if (this.contador >= 20) {
            this.direccionAleatoria = Math.floor(Math.random() * arrayDireccion.length);
            this.contador = 0;
        }
        if (this.isMarron) {
            switch (arrayDireccion[this.direccionAleatoria]) {
                case 1: // Mover hacia abajo
                    if (currentTop + Distancia < tierra.clientHeight - 15) {
                        this.hormiga.style.top = `${currentTop + Distancia}px`;
                        this.hormiga.src = 'img/hormigaMarronAbajo.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 3;
                    }
                    break;
                case 2: // Mover hacia la derecha
                    if (currentLeft + Distancia < tierra.clientWidth - 30) {
                        this.hormiga.style.left = `${currentLeft + Distancia}px`;
                        this.hormiga.src = "img/hormigaMarronDerecha.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 4;
                    }
                    break;
                case 3: // Mover hacia arriba
                    if (currentTop - Distancia >= 0) {
                        this.hormiga.style.top = `${currentTop - Distancia}px`;
                        this.hormiga.src = 'img/hormigaMarronArriba.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 1;
                    }
                    break;
                case 4: // Mover hacia la izquierda
                    if (currentLeft - Distancia >= 0) {
                        this.hormiga.style.left = `${currentLeft - Distancia}px`;
                        this.hormiga.src = "img/hormigaMarronIzquierda.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 2;
                    }
                    break;
                default:
                    console.log("Estoy en el default del switch marron");
            }
        } else if (this.isRoja) {
            switch (arrayDireccion[this.direccionAleatoria]) {
                case 1: // Mover hacia abajo
                    if (currentTop + Distancia < tierra.clientHeight - 15) {
                        this.hormiga.style.top = `${currentTop + Distancia}px`;
                        this.hormiga.src = 'img/hormigaRojaAbajo.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 3;
                    }
                    break;
                case 2: // Mover hacia la derecha
                    if (currentLeft + Distancia < tierra.clientWidth - 30) {
                        this.hormiga.style.left = `${currentLeft + Distancia}px`;
                        this.hormiga.src = "img/hormigaRojaDerecha.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 4;
                    }
                    break;
                case 3: // Mover hacia arriba
                    if (currentTop - Distancia >= 0) {
                        this.hormiga.style.top = `${currentTop - Distancia}px`;
                        this.hormiga.src = 'img/hormigaRojaArriba.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 1;
                    }
                    break;
                case 4: // Mover hacia la izquierda
                    if (currentLeft - Distancia >= 0) {
                        this.hormiga.style.left = `${currentLeft - Distancia}px`;
                        this.hormiga.src = "img/hormigaRojaIzquierda.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 2;
                    }
                    break;
                default:
                    console.log("Estoy en el default del switch rojo");
            }
        } else {
            switch (arrayDireccion[this.direccionAleatoria]) {
                case 1: // Mover hacia abajo
                    if (currentTop + Distancia < tierra.clientHeight - 15) {
                        this.hormiga.style.top = `${currentTop + Distancia}px`;
                        this.hormiga.src = 'img/hormigaNegraAbajo.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 3;
                    }
                    break;
                case 2: // Mover hacia la derecha
                    if (currentLeft + Distancia < tierra.clientWidth - 30) {
                        this.hormiga.style.left = `${currentLeft + Distancia}px`;
                        this.hormiga.src = "img/hormigaNegraDerecha.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 4;
                    }
                    break;
                case 3: // Mover hacia arriba
                    if (currentTop - Distancia >= 0) {
                        this.hormiga.style.top = `${currentTop - Distancia}px`;
                        this.hormiga.src = 'img/hormigaNegraArriba.png';
                        this.hormiga.style.width = 20 + "px";
                        this.hormiga.style.height = 40 + "px";
                    } else {
                        this.direccionAleatoria = 1;
                    }
                    break;
                case 4: // Mover hacia la izquierda
                    if (currentLeft - Distancia >= 0) {
                        this.hormiga.style.left = `${currentLeft - Distancia}px`;
                        this.hormiga.src = "img/hormigaNegraIzquierda.png";
                        this.hormiga.style.width = 40 + "px";
                        this.hormiga.style.height = 20 + "px";
                    } else {
                        this.direccionAleatoria = 2;
                    }
                    break;
                default:
                    console.log("Estoy en el default del switch");
            }
        }
    }
}

// Array vacío para almacenar las hormigas que se vayan creando
const arrayHormiga = [];

// Función para crear el número de hormigas que queramos, en este caso 5
function crearHormiga() {
    if (arrayHormiga.length < 15) {
        let nuevaHormiga = new Hormiga();
        arrayHormiga.push(nuevaHormiga);
    }
}

// crear más hormigas
function crearHormigaNivel2() {
    if (arrayHormiga.length < 30) {
        let nuevaHormigaNivel2 = new Hormiga();
        arrayHormiga.push(nuevaHormigaNivel2);
    }
}

// SetInterval para que vayan apareciendo las hormigas que se van creando cada x tiempo
let intervalo = setInterval(() => {
    crearHormiga();
}, 300);

// Intervalo para mover las hormigas
let intervaloMovimiento = setInterval(() => {
    arrayHormiga.forEach(hormiga => {
        hormiga.mover();
    });
}, 200);

// Crear movimiento del contador
function formatearTiempo(valor) {
    return valor < 10 ? "0" + valor : valor;
}

function iniciarContador() {
    segundos += 1;

    if (segundos == 60) {
        minutos += 1;
        segundos = 0;
    } else if (minutos == 60) {
        horas += 1;
        minutos = 0;
    } else if (horas == 2) {
        derrota();
    }

    contador.innerHTML = formatearTiempo(horas) + ":" + formatearTiempo(minutos) + ":" + formatearTiempo(segundos);
}

// función derrota para que aparezca la pantalla de derrota y se formatee el juego 
function derrota() {
    clearInterval(intervaloMovimiento);
    clearInterval(intervalId);

    setTimeout(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';

        document.getElementById("pantalla").style.display = "flex";
        document.getElementById("pantalla").className = "pantalla derrota";
        document.getElementById("parrafoPantalla").className = "parrafoDerrota";
        document.getElementById("parrafoPantalla").textContent = "¡Has perdido! ¡Inténtalo de nuevo!";
        document.getElementById("iniciar").className = "reiniciarDerrota";
        document.getElementById("iniciar").textContent = "Reiniciar";
        document.getElementById("iniciar").removeEventListener("click", reiniciarJuego); // Eliminar el evento anterior
        document.getElementById("iniciar").addEventListener("click", reiniciarJuego); // Agregar el nuevo evento

    }, 500);
}

function verificarVictoria() {
    // Comprobamos que todas las hormigas son sangre
    const todasSangre = arrayHormiga.every(hormiga => hormiga.isSangre);

    // Verificamos si todas las hormigas son sangre y si estamos en el primer nivel
    if (todasSangre && horas < 1 && arrayHormiga.length <= 15) {
        victoria(); // Llamar a la función de victoria para el primer nivel
    } 

    // Verificamos si todas las hormigas son sangre y si estamos en el segundo nivel
    else if (todasSangre && horas < 1 && arrayHormiga.length > 15) {
        victoriaNivel2(); // Llamar a la función de victoria para el segundo nivel
    }
}

// función victoria para pasar al siguiente nivel
function victoria() {

    clearInterval(intervaloMovimiento);
    clearInterval(intervalId);

    setTimeout(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';

        document.getElementById("pantalla").style.display = "flex";
        document.getElementById("pantalla").className = "pantalla victoria";
        document.getElementById("parrafoPantalla").className = "parrafoVictoria";
        document.getElementById("parrafoPantalla").textContent = "¡Felicidades! Has conseguido aplastarlas todas a tiempo";
        document.getElementById("iniciar").className = "reiniciar";
        document.getElementById("iniciar").textContent = "Siguiente Nivel";
        document.getElementById("iniciar").removeEventListener("click", nivel2); // Eliminar el evento anterior
        document.getElementById("iniciar").addEventListener("click", nivel2); // Llamar a la función nivel2
    }, 500);
}

function victoriaNivel2() {

    clearInterval(intervaloMovimiento);
    clearInterval(intervalId);

    setTimeout(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';

        document.getElementById("pantalla").style.display = "flex";
        document.getElementById("pantalla").className = "pantalla victoria";
        document.getElementById("parrafoPantalla").className = "parrafoVictoria";
        document.getElementById("parrafoPantalla").textContent = "¡Eres un crack! Has conseguido aplastarlas todas a tiempo";
        document.getElementById("iniciar").className = "reiniciar";
        document.getElementById("iniciar").textContent = "Reiniciar Juego";
        document.getElementById("iniciar").removeEventListener("click", reiniciarJuego); // Eliminar el evento anterior
        document.getElementById("iniciar").addEventListener("click", reiniciarJuego); // Agregar el nuevo evento

    }, 500);
}

// función para reiniciar el juego y que no salga la pantalla de inicio
function reiniciarJuego() {
    // Restablecer variables
    segundos = 0;
    minutos = 0;
    horas = 0;

    contador.innerHTML = formatearTiempo(horas) + ":" + formatearTiempo(minutos) + ":" + formatearTiempo(segundos);

    // Limpiar el contenedor de hormigas
    arrayHormiga.forEach(hormiga => {
        tierra.removeChild(hormiga.hormiga);
    });

    arrayHormiga.length = 0; // Vaciar el array de hormigas

    // Reiniciar el contador
    clearInterval(intervalId);
    intervalId = setInterval(iniciarContador, 10);

    // Reiniciar el movimiento de hormigas
    clearInterval(intervaloMovimiento);
    intervaloMovimiento = setInterval(() => {
        arrayHormiga.forEach(hormiga => {
            hormiga.mover();
        });
    }, 200);

    // Reiniciar la creación de hormigas
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        crearHormiga();
    }, 300);

    // Ocultar la pantalla de derrota
    document.getElementById("pantalla").style.display = "none";
}

function nivel2() {
    // Restablecer variables
    segundos = 0;
    minutos = 0;
    horas = 0;

    contador.innerHTML = formatearTiempo(horas) + ":" + formatearTiempo(minutos) + ":" + formatearTiempo(segundos);

    // Limpiar el contenedor de hormigas
    arrayHormiga.forEach(hormiga => {
        tierra.removeChild(hormiga.hormiga);
    });

    arrayHormiga.length = 0; // Vaciar el array de hormigas

    // Reiniciar el contador
    clearInterval(intervalId);
    intervalId = setInterval(iniciarContador, 10);

    // Reiniciar el movimiento de hormigas
    clearInterval(intervaloMovimiento);
    intervaloMovimiento = setInterval(() => {
        arrayHormiga.forEach(hormiga => {
            hormiga.mover();
        });
    }, 200);

    // Reiniciar la creación de hormigas
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        crearHormigaNivel2(); // Cambiar a crearHormigaNivel2 para el segundo nivel
    }, 300);

    // Ocultar la pantalla de derrota
    document.getElementById("pantalla").style.display = "none";
}

// pantalla de inicio del juego 
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("iniciar").addEventListener("click", function () {
        document.getElementById("pantalla").style.display = "none";

        clearInterval(intervalId);
        intervalId = setInterval(iniciarContador, 10);
    });
});