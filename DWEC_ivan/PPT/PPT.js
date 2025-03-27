// Inicialización de variables
contadorJugador = 5;   // Contador de vidas del jugador
contadorBot = 5;       // Contador de vidas del bot
puntuacion = 0;        // Puntuación del jugador
puntuacion2 = 0;       // Puntuación del bot
victoriasConsecutivas = 0; // Contador de victorias consecutivas

// Función para resetear los bordes de las imágenes
function resetBordes() { 
    document.getElementById("piedra").style.borderColor = "#000000"; 
    document.getElementById("papel").style.borderColor = "#000000"; 
    document.getElementById("tijera").style.borderColor = "#000000"; 
    document.getElementById("piedra2").style.borderColor = "#000000"; 
    document.getElementById("papel2").style.borderColor = "#000000"; 
    document.getElementById("tijera2").style.borderColor = "#000000"; 
}

// Función para mostrar el mensaje de victoria
function ganar(){
    document.getElementById("espacio").innerHTML = "YOU WON";
    document.getElementById("botonReiniciar").style.backgroundColor = "#00c90a";
    document.getElementById("espacio").style.color = "#00ff08";
    document.getElementById("finalizar").style.display = "block";
    document.getElementById("panelVictorias").style.display = "none";
    document.getElementById("todo").style.display = "none";
}

// Función para mostrar el mensaje de derrota
function perder(){
    document.getElementById("espacio").innerHTML = "GAME OVER";
    document.getElementById("botonReiniciar").style.marginLeft = "26.7%";
    document.getElementById("finalizar").style.display = "block";
    document.getElementById("panelVictorias").style.display = "none";
    document.getElementById("todo").style.display = "none";
}

// Función para actualizar las vidas de los jugadores
function vidas(){
    if (contadorJugador == 4) {
        document.getElementById("jugador1").src = "vidas2.png";
    } else if (contadorJugador == 3) {
        document.getElementById("jugador2").src = "vidas2.png";
    } else if (contadorJugador == 2) {
        document.getElementById("jugador3").src = "vidas2.png";
    } else if (contadorJugador == 1) {
        document.getElementById("jugador4").src = "vidas2.png";
    } else if (contadorJugador == 0) {
        document.getElementById("jugador5").src = "vidas2.png";
        perder();
    }

    if (contadorBot == 0) {
        document.getElementById("bot1").src = "vidas2.png";
        ganar();
    } else if (contadorBot == 1) {
        document.getElementById("bot2").src = "vidas2.png";
    } else if (contadorBot == 2) {
        document.getElementById("bot3").src = "vidas2.png";
    } else if (contadorBot == 3) {
        document.getElementById("bot4").src = "vidas2.png";
    } else if (contadorBot == 4) {
        document.getElementById("bot5").src = "vidas2.png";
    }
}

// Función para manejar cuando el jugador gana
function ganasTu(){
    contadorBot -= 1;
    victoriasConsecutivas += 1;
    document.getElementById("victoriasConsecutivas").innerHTML = victoriasConsecutivas;
    if(victoriasConsecutivas == 2){
        puntuacion += 200;
    }else if(victoriasConsecutivas == 3){
        puntuacion *= 2;
    }else{
        puntuacion += 100;
    }
    document.getElementById("puntuacion").innerHTML = puntuacion;
    if(puntuacion >= 600){
        ganar();
    }
    vidas();
}

// Función para manejar cuando el bot gana
function ganaElBot(){
    puntuacion2 += 100;
    document.getElementById("puntuacion2").innerHTML = puntuacion2;
    contadorJugador -= 1;
    victoriasConsecutivas = 0;
    document.getElementById("victoriasConsecutivas").innerHTML = victoriasConsecutivas;
    vidas();
}

// Función que se llama cuando el jugador elige "piedra"
function piedra(){
    resetBordes();
    bot = Math.floor(Math.random()*3);
    document.getElementById("piedra").style.borderColor = "#00FF00";

    if(bot == 2){
        //ganas tu
        document.getElementById("tijera2").style.borderColor = "#FF0000";
        ganasTu();
    }else if(bot == 1){
        //gana el bot
        document.getElementById("papel2").style.borderColor = "#FF0000";
        ganaElBot();
    }else{
        document.getElementById("piedra2").style.borderColor = "#FF0000";
        victoriasConsecutivas = 0;
        document.getElementById("victoriasConsecutivas").innerHTML = victoriasConsecutivas;
    }
}

// Función que se llama cuando el jugador elige "papel"
function papel(){
    resetBordes();
    bot = Math.floor(Math.random()*3);
    document.getElementById("papel").style.borderColor = "#00FF00";

    if(bot == 0){
        //ganas tu
        document.getElementById("piedra2").style.borderColor = "#FF0000";
        ganasTu();
    }else if(bot == 2){
        //gana el bot
        document.getElementById("tijera2").style.borderColor = "#FF0000";
        ganaElBot();
    }else{
        document.getElementById("papel2").style.borderColor = "#FF0000";
        victoriasConsecutivas = 0;
        document.getElementById("victoriasConsecutivas").innerHTML = victoriasConsecutivas;
    }
}

// Función que se llama cuando el jugador elige "tijera"
function tijera(){
    resetBordes();
    bot = Math.floor(Math.random()*3);
    document.getElementById("tijera").style.borderColor = "#00FF00";

    if(bot == 1){
        //ganas tu
        document.getElementById("papel2").style.borderColor = "#FF0000";
        ganasTu();

    }else if(bot == 0){
        //gana el bot
        document.getElementById("piedra2").style.borderColor = "#FF0000";
        ganaElBot();
        
    }else{
        document.getElementById("tijera2").style.borderColor = "#FF0000";
        victoriasConsecutivas = 0;
        document.getElementById("victoriasConsecutivas").innerHTML = victoriasConsecutivas;
    }
}

// Recarga la pagina
function reiniciar(){
    location.reload();
}