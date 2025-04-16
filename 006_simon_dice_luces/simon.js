const DERROTA = 0;
const VICTORIA = 1;
const MAX_LEVEL = 20;
const INITIAL_LEVEL = 1;

//sonidos
const sonido_amarillo_simon = new Audio("./audio/amarillo_simon.mp3"); 
const sonido_azul_simon = new Audio("./audio/azul_simon.mp3"); 
const sonido_rojo_simon = new Audio("./audio/rojo_simon.mp3"); 
const sonido_verde_simon = new Audio("./audio/verde_simon.mp3"); 
const sonido_error_simon = new Audio("./audio/error_simon.mp3"); 

const tecla_amarilla = document.querySelector(".amarilla");
const tecla_roja = document.querySelector(".roja");
const tecla_verde = document.querySelector(".verde");
const tecla_azul = document.querySelector(".azul");

const nivel_div = document.querySelector(".nivel");
const iniciar_btn = document.getElementById("iniciar_btn");

//listeners
tecla_amarilla.addEventListener("click", manejaClick)
tecla_roja.addEventListener("click", manejaClick)
tecla_verde.addEventListener("click", manejaClick)
tecla_azul.addEventListener("click", manejaClick)

iniciar_btn.addEventListener("click", iniciarSecuencia);

//variables del programa
let nivel = INITIAL_LEVEL;
let turno_player = false;

let clicks = 0; //clicks del usuario, para saber en que paso de la secuencia esta
let numAciertos=0; //num de aciertos de la secuencia, si coinicide con el num de nivel habrá superado este
let stepSecuencia = 0;  //digamos paso por donde esta la secuencia de la

let idIntervalo = null;  //para controlar el intervalo de la secuencia de la cpu

const secuencia = []; //array donde meteremos la secuencia total de MAX_LEVEL que iremos mostrando cada vez +1
const teclasIDs = ["tecla_amarilla", "tecla_roja", "tecla_verde", "tecla_azul"];




crearSecuencia();



function iniciarSecuencia(){
console.log("inicia secuencia cpu")
turno_player=false;
clicks=0; //como es el turno de la cpu, los clicks del player se ponen a cero
iniciar_btn.disabled=true;
    if (idIntervalo == null) {
        idIntervalo = setInterval(() => {
            if (stepSecuencia < nivel) {
                accionaTecla(secuencia[stepSecuencia]);
            }
            stepSecuencia++;
            if (stepSecuencia == nivel) {
                stepSecuencia=0; //coloco el step al ppo de la secuencia
                pararSecuencia();}
        }, 500);
    }
}


//manejar el click del usuario
function manejaClick(e) {

    if(turno_player){
       if(clicks<nivel){
            if(e.target.id==secuencia[clicks]){
                console.log("acierto");
                numAciertos++;
            }else{
                accionaTecla(e.target.id);
                suena("sadf");
                findelJuego(DERROTA);
                console.log("fallaste");
                return;
            }
            clicks++; 
            if(numAciertos==nivel){
                numAciertos=0;
                clicks=0;
                console.log("nivel superado")
                document.body.classList.toggle("nextLevel");
                setTimeout(() => {
                    document.body.classList.toggle("nextLevel");
                }, 500);
                
                nivel++;
                nivel_div.classList.add("destacar")
                setTimeout(() => {
                    iniciarSecuencia();
                    nivel_div.classList.remove("destacar")
                }, 1000);
                nivel_div.innerHTML=`Nivel #${nivel}`;
            }
              
            accionaTecla(e.target.id);
            
        }
        
    }else{
      
        
    }
    
    

}

function setInicio(){
    clicks=0;
    numAciertos=0;
    nivel=INITIAL_LEVEL;
    nivel_div.innerHTML=`Nivel #${nivel}`;
    stepSecuencia = 0;
    idIntervalo = null; 
    crearSecuencia();
    setTimeout(() => {
        iniciarSecuencia();    
    }, 2000);
    
}


function crearSecuencia(){
    let rand = 0;
    
    while(secuencia.length>0){
        secuencia.pop(); //vacío el array
    }
    
    //creo secuencia
    for (let i = 0; i < MAX_LEVEL; i++) {
        rand = Math.floor(Math.random() * 4);
        secuencia.push(teclasIDs[rand]); //meto uno de los ids de las teclas de manera aleatoria
    }
}

function accionaTecla(teclaID) {
    suena(teclaID)
    document.getElementById(`${teclaID}`).classList.add("luminosa")
    setTimeout(() => { document.getElementById(`${teclaID}`).classList.remove("luminosa") }, 300)
}

function pararSecuencia() {
    clearInterval(idIntervalo);
    idIntervalo=null;
    turno_player=true;
    setTimeout(()=>{iniciar_btn.disabled=false},500);
}


function findelJuego(resultado){
    console.log("fin del juego")
    //clicks=nivel; //asi no puedes seguir haciendo clicks
    if(resultado==DERROTA){
        setInicio();
        nivel_div.classList.add("destacar")
        document.body.classList.toggle("fail");
        setTimeout(() => {
            document.body.classList.toggle("fail");
            nivel_div.classList.remove("destacar")
        }, 1500);
        
    }else{alert("ganaste");}
    muestraFormulario()
}

function muestraFormulario(){
    console.warn("hay que implementar el formulario para scores")
}



function suena(color){
    switch (color){
        case "tecla_amarilla":{
            sonido_amarillo_simon.currentTime = 0; //al ppo
            sonido_amarillo_simon.play();
            break;
        }
        case "tecla_azul":{
            sonido_azul_simon.currentTime = 0; //al ppo
            sonido_azul_simon.play();
            break;
        }
        case "tecla_roja":{
            sonido_rojo_simon.currentTime = 0; //al ppo
            sonido_rojo_simon.play();
            break;
        }
        case "tecla_verde":{
            sonido_verde_simon.currentTime = 0; //al ppo
            sonido_verde_simon.play();
            break;
        }
        default: {
            sonido_error_simon.currentTime = 0; //al ppo
            sonido_error_simon.play();
        }
    }
    
}