const AMARILLO = 0;
const AZUL = 1;
const VERDE = 2;
const ROJO = 3;


const DERROTA = 0;
const VICTORIA = 1;
const MAX_LEVEL = 20;
const INITIAL_LEVEL = 1;

const sonido_amarillo_simon = new Audio("./audio/amarillo_simon.mp3"); 
const sonido_azul_simon = new Audio("./audio/azul_simon.mp3"); 
const sonido_rojo_simon = new Audio("./audio/rojo_simon.mp3"); 
const sonido_verde_simon = new Audio("./audio/verde_simon.mp3"); 



const tecla_amarilla = document.querySelector(".amarilla");
const tecla_roja = document.querySelector(".roja");
const tecla_verde = document.querySelector(".verde");
const tecla_azul = document.querySelector(".azul");



tecla_amarilla.addEventListener("click", manejaClick)
tecla_roja.addEventListener("click", manejaClick)
tecla_verde.addEventListener("click", manejaClick)
tecla_azul.addEventListener("click", manejaClick)

let clicks = 0;
let turno_player = false;
let numAciertos=0;
let nivel = INITIAL_LEVEL;

const nivel_div = document.querySelector(".nivel");

function manejaClick(e) {

    if(turno_player){
       if(clicks<nivel){
            if(e.target.id==secuencia[clicks]){
                console.log("acierto");
                numAciertos++;
            }else{
                iluminaTecla(e.target.id);
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
                setTimeout(() => {
                    iniciarSecuencia();
                }, 1000);
                nivel_div.innerHTML=`Nivel #${nivel}`;
            }
              
            iluminaTecla(e.target.id);
            
        }
        
    }else{
        //turno cpu
        
    }
    
    

}

function setInicio(){
    numAciertos=0;
    clicks=0;
    nivel=1;
    nivel_div.innerHTML=`Nivel #${nivel}`;
}
function iluminaTecla(teclaID) {
    suena(teclaID)
    document.getElementById(`${teclaID}`).classList.add("luminosa")
    setTimeout(() => { document.getElementById(`${teclaID}`).classList.remove("luminosa") }, 300)
}



const secuencia = []
const teclasIDs = ["tecla_amarilla", "tecla_roja", "tecla_verde", "tecla_azul"]




let stepSecuencia = 0;
let rand = 0;

let idIntervalo = null;
//creo secuencia
for (let i = 0; i < MAX_LEVEL; i++) {
    rand = Math.floor(Math.random() * 4);
    secuencia.push(teclasIDs[rand]);
}

const iniciar_btn = document.getElementById("iniciar_btn");

iniciar_btn.addEventListener("click", iniciarSecuencia);

function iniciarSecuencia(){
console.log("inicia secuencia cpu")
    debuug();
turno_player=false;
clicks=0; //como es el turno de la cpu, los clicks del player se ponen a cero
iniciar_btn.disabled=true;
    if (idIntervalo == null) {
        idIntervalo = setInterval(() => {
            if (stepSecuencia < nivel) {
                iluminaTecla(secuencia[stepSecuencia]);
                console.log(secuencia[stepSecuencia])
            }
            stepSecuencia++;
            if (stepSecuencia == nivel) {
                stepSecuencia=0; //coloco el step al ppo de la secuencia
                pararSecuencia();}
        }, 500);
    }
}







function pararSecuencia() {
    clearInterval(idIntervalo);
    idIntervalo=null;
    turno_player=true;
    setTimeout(()=>{iniciar_btn.disabled=false},500);
}

//iniciar_btn.click();


function findelJuego(resultado){
    console.log("fin del juego")
    //clicks=nivel; //asi no puedes seguir haciendo clicks
    if(resultado==DERROTA){
        setInicio();
        document.body.classList.toggle("fail");
        setTimeout(() => {
            document.body.classList.toggle("fail");
        }, 1500);
        
    }else{alert("ganaste");}
    muestraFormulario()
}

function muestraFormulario(){
    console.warn("hay que implementar el formulario para scores")
}

function debuug(){
    console.log("nivel",nivel)
    console.log("clicks",clicks)
    console.log("num aciertos",numAciertos)
    

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
    }
    
}