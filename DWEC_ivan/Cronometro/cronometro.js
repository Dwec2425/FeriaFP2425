//variables
cronometro = document.getElementById("Cronometro");
segundos = 0;
minutos = 0;
multiplicador = 1;
velocidad = 1000 / multiplicador;

//para empezar el contador
function empezarContador(){
    if(!intervalo){
        intervalo = setInterval(()=>{
            segundos += 1;
            if(segundos == 60){
                segundos = 0;
                minutos += 1;
            }
            cronometro.innerHTML = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
        }, velocidad);
    }
}

//para detener el contador
function detenerContador(){
    clearInterval(intervalo);
    intervalo = null;
}

//para cambiar el multiplicador
function actualizarMult(value){
    multiplicador = value;
    document.getElementById("intervaloMult").innerHTML = "x" + multiplicador;
    velocidad = 1000 / multiplicador;
    //para que no empiece el intervalo si no se da al boton de iniciar
    if(intervalo){
        detenerContador();
        empezarContador();
    }
}

//se inicia el contador al pulsar el boton
let intervalo;
document.getElementById("Iniciar").addEventListener("click", ()=>{
    empezarContador();
});

//se detiene el contador al pulsar el boton
document.getElementById("Parar").addEventListener("click", ()=>{
    detenerContador();
});

//se detiene y se reinician los valores del contador al pulsar el boton
document.getElementById("Reiniciar").addEventListener("click", ()=>{
    detenerContador();
    segundos = 0;
    minutos = 0;
    cronometro.innerHTML = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
});