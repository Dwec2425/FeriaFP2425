const DRAGON = '\u{1F432}';
const TORTUGA = '\u{1F422}';
const POLLITO = '\u{1F424}';
const CARACOL = '\u{1F40C}';
const iconos = [DRAGON, TORTUGA, POLLITO, CARACOL];
let numClicks = 0;
let idPareja_enjuego1 = null;
let idPareja_enjuego2 = null;
let verificaPareja = new Array(2); //array de 2 elementos donde vamos guardando lo que se va mostrando
let numParejaEncontrada = 0;

const cartasHolder = document.querySelectorAll(".carta_holder");
const tablero = document.querySelector("#tablero");
const cartas = new Array(cartasHolder.length); //defino mi array de objetos carta, del tamaño del numero de holders en html


for (let i = 0; i < cartasHolder.length; i++) {

    cartasHolder[i].id = `holder${i}`;
    cartasHolder[i].setAttribute("idpareja", `${i % iconos.length}`);

    cartas[i] = new carta(iconos[i % iconos.length]);
    cartas[i].setId(i);
    cartas[i].setIdPareja(i % iconos.length);
    cartasHolder[i].appendChild(cartas[i].html);
    //console.log(`Carta creada: con id ${cartas[i].id} e icono ${cartas[i].texto}. id de pareja es con id ${cartas[i].idPareja}`);
    //console.log(`Carta ${cartas[i].id} añadida a su holder`)
}

cartasHolder.forEach((cartaHolder) => {
    cartaHolder.addEventListener("click", manejaclicHolder)
})

function manejaclicHolder(e) {
    
    console.log(`click en HOLDER`)
   
    if (numClicks < 2) {
        //debido a la propagacion, cuando llevo un click, y pincho en un cartaHolder se ejecuta el listener, y luego 
        //por burbuja, el evento se propaga para arriba, en el tablero que tiene un listener de clic también se incrementa
        const identificadorHandler = e.target.id;
        const arrayTemporal = identificadorHandler.match(/\d+$/); // Busca números al final de la cadena
        let identificadorHandlerINT = null;  
        if (arrayTemporal) { //if para comprobar que haya encontrado correctamente numero seria mejor usar try y catch pero bueno, en otro proyecto
            identificadorHandlerINT = arrayTemporal[0];
            identificadorHandlerINT = parseInt(identificadorHandlerINT, 10); // Convierte a número entero en base 10, decimal vamos
        } else {
            console.log("ERROR 34 No se encontraron números");
            identificadorHandlerINT = identificadorHandler[6]; //el 7º caracter del identificador es un numero, dara error cuando haya mas de 9 numeros, en el decimo
        }
        
        cartasHolder[identificadorHandlerINT].style.visibility = "hidden";
        cartas[identificadorHandlerINT].html.style.visibility = "visible";
        if (numClicks == 0) {
            //primeraCarta
            
            verificaPareja[0] = cartas[identificadorHandlerINT].id;
            idPareja_enjuego1 = cartas[identificadorHandlerINT].idPareja;
        } else if (numClicks == 1) {
            
            verificaPareja[1] = cartas[identificadorHandlerINT].id;
            idPareja_enjuego2 = cartas[identificadorHandlerINT].idPareja;
        }
        if(idPareja_enjuego1 == idPareja_enjuego2){
            //pareja encontrada, pero sumo las parejas en el tablero, con la burbuja, lo que hago ahora es detener la propatacion del evento
            e.stopPropagation();
            console.log("detengo la propagacion del evento");
             //has encontrado pareja
            
             numParejaEncontrada++;
             console.log("SUMO PAREJA EN TABLERO Y QUITAMOS listener en los holders numpareja = "+ numParejaEncontrada)
             cartasHolder[verificaPareja[0]].removeEventListener("click",manejaclicHolder);
             cartasHolder[verificaPareja[1]].removeEventListener("click",manejaclicHolder);
        }
    }

}



tablero.addEventListener("click",manejaClickTablero)

function manejaClickTablero(e){
    console.log(`click en TABLERO que llega por BURBUJA`);
    console.log(e);
    
    numClicks++;
    if (numClicks == 1) {

    }
    if (numClicks == 2) {
        
        if (idPareja_enjuego1 == idPareja_enjuego2) {
           
        } else {
            console.log("NO has encontrado pareja, de momento llevas "+ numParejaEncontrada+ " parejas encontradas")
            setTimeout(() => {
                cartas.forEach((elemento, index) => {
                    elemento.html.style.visibility = "hidden";
                    cartasHolder[index].style.visibility = "visible";
                });
            }, 1000);
        }

        numClicks = 0;
        if (numParejaEncontrada == 4) {
            alert("FIN DEL JUEGO")
        }
    }
}


