let color = "purple"; //definimos el color con el que vamos a empezar
let turno = "X"; //definimos el turno con el que empezaremos, es decir X u O. En este caso empezamos con X y empezamos nosotros en vez del ordenador
let tablero = true; //esto lo hago para que cuando salte el mensaje de ganar o perder, no permita seguir haciendo click en los botones vacíos.

//función que cambia el color de las casillas del tablero al hacer click
function cambiarColor(element) {

    if (!tablero) { //para que cuando el juego no esté realizandose no haga nada
        return;
    }

    //esto lo he implementado para que no pueda modificar mi símbolo, antes podía cambiar mi botón X por O, con este if ya no
    if (element.innerHTML !== "") {
        return;
    }

    element.style.backgroundColor = color; 
    element.innerHTML = turno;

    //un click morado, un click rosa y así sucesivamente
    if (color === "purple") {
        color = "pink";
        turno = "O"; //cambia el simbolo a O
    } else {
        color = "purple";
        turno = "X"; //cambia el simbolo a X
    }

    //comprueba si hay un ganador
    if (comprobarGanador()) {
        return; //si hay un ganador no permite seguir jugando
    }

    if (turno === "O") { //si el turno que toca es O, juega la máquina
        setTimeout(maquina, 200); //el tiempo que tarda la máquina en responder
    }
}

function maquina() {
    const botones = document.querySelectorAll("#tablero button");
    let casillaElegida = null;

    //busca una casilla vacía
    for (let i = 0; i < botones.length; i++) {
        if (botones[i].innerHTML === "") {
            //elige una casilla vacía
            if (Math.random() < 1 / (botones.length - i)) { //con esto haremos que seleccione una de las casillas vacías al azar
                casillaElegida = botones[i];
                console.log("Casilla elegida "+ botones[i]);
            }
        }
    }

    //si hay casillas vacías la máquina pone O (y por lo tanto rosa), en una aleatoria
    if (casillaElegida) {
        casillaElegida.style.backgroundColor = "pink";
        casillaElegida.innerHTML = "O";

        //el siguiente turno es morado, X
        color = "purple";
        turno = "X";
    }

    //comprueba si hay un ganador después de que la máquina juega
    comprobarGanador();
}

//función para comrpobar si hay un ganador, esta función la hice con ayuda de vídeos/ia
function comprobarGanador() {
    const botones = Array.from(document.querySelectorAll("#tablero button")); //array para guardar las posibles combinaciones para poder ganar el juego
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columnas
        [0, 4, 8], [2, 4, 6]  //diagonales
    ];

    let ganar = false;

    combinaciones.forEach(combinacion => {
        const a = combinacion[0];
        const b = combinacion[1];
        const c = combinacion[2];

        if (botones[a].innerHTML !== "" && botones[a].innerHTML === botones[b].innerHTML && botones[a].innerHTML === botones[c].innerHTML) {
            mostrarMensaje(botones[a].innerHTML);
            ganar = true; //sí hay un ganador
        }
    });

    return ganar; //devuelve si hay un ganador
}

function mostrarMensaje(resultado) {
    const mensaje = document.createElement("h3");
   
    if (resultado === "X") {
        mensaje.innerHTML = "¡Has ganado!";
    } else {
        mensaje.innerHTML = "Has perdido...";
    }
    
    document.getElementById("resultado").innerHTML = ""; //esto elimina el mensaje anterior
    document.getElementById("resultado").appendChild(mensaje); 

    //cuando se muestra el mensaje, el tablero deja de funcionar
    tablero = false; 
}

//función de resetear; es decir, cuando le das al botón de reiniciar desaparecen todos los colores de las casillas
function reset() {
    document.querySelectorAll("#tablero button").forEach(element => {
        element.innerHTML = "";
        element.style.backgroundColor = "";
    });
    color = "purple"; //esto es para que vuelva a comenzar por morado
    turno = "X"; //vuelve a comenzar por X
    document.getElementById("resultado").innerHTML = ""; //esto elimina el mensaje despues de darle al boton de reset

    //cuando se le da al botón de reset, el tablero vuelve a estar disponible para hacer click en él
    tablero = true; 
}

//seleccionamos los botones y los recorremos con el foreach, para que cuando hagamos click cambie el color
document.querySelectorAll("#tablero button").forEach(button => {
    button.addEventListener("click", function() {
        cambiarColor(button);
    });
});

//cuando se haga click en el botón de reinicio, se resetea y se vuelve a empezar
document.getElementById("resetButton").addEventListener("click", reset);