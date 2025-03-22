const PRIMIGENIO = 0;
const BORDE = 1;
const FONDO = 2;
const FRUTILLA = 3;
const SERPIENTE = 4;

const ARRIBA = 10;
const ABAJO = 11;
const IZQUIERDA = 12;
const DERECHA = 13;

/* CONFIGURACION DEL JUEGO -- INICIO*/
const NUMERO_FRUTILLAS = 55;            //Numero de frutillas que se crearán en el tablero (cada frutilla que se coma se regenera aleatoriamente en una posicion del tablero)
const DIM = 40;                         //Representa el ancho en casillas del tablero, p ej si DIM = 20 el tablero sera de 20x20 es decir 400 casillas POR DEFECTO=40
const TAM_SERPTIENTE = 8;               //Tamaño inicial de la serpiente
const VELOCIDAD = 50;                  //velocidad de la serpiente, cuanto más pequeño más pequeño mas rapido, son los milisegundos que tarda en moverse la serpiente, valores mayores de 10 
/* CONFIGURACION DEL JUEGO -- INICIO*/
class tablero {
    constructor() {
        const tableroTemp = document.createElement("div");
        tableroTemp.classList.add("tablero");
        document.getElementById("cuerpo").appendChild(tableroTemp);

        
        //casillas
        let tamanoCasilla = Math.floor((document.getElementById("contenedor_gral").clientWidth) / DIM);
        tamanoCasilla*=0.5;
        tableroTemp.style.gridTemplateColumns = `repeat(${DIM}, ${tamanoCasilla}px)`;
        tableroTemp.style.gridTemplateRows = `repeat(${DIM},  ${tamanoCasilla}px)`;


        this.casillas = new Array(DIM);
        for (let i = 0; i < DIM; i++) {
            this.casillas[i] = new Array(DIM);
            for (let j = 0; j < DIM; j++) {
                this.casillas[i][j] = new casilla(i, j, tamanoCasilla);
                tableroTemp.appendChild(this.casillas[i][j].casillaElement);
                //console.log(`casilla[${i}][${j}] creada`);
            }
        }
        this.tableroHTML = tableroTemp;
        console.log("tablero creado");
        

    }
    muestraTipo() {
        for (let i = 0; i < DIM; i++) {

            for (let j = 0; j < DIM; j++) {
                switch (this.casillas[i][j].tipo) {

                    case PRIMIGENIO:
                        this.casillas[i][j].casillaElement.className = "casilla";

                        break;
                    case BORDE:
                        this.casillas[i][j].casillaElement.className = "casilla";
                        this.casillas[i][j].casillaElement.classList.add("borde")
                        break;
                    case FONDO:
                        this.casillas[i][j].casillaElement.className = "casilla";
                        this.casillas[i][j].casillaElement.classList.add("fondo")
                        break;
                    case FRUTILLA:
                        this.casillas[i][j].casillaElement.className = "casilla";
                        this.casillas[i][j].casillaElement.classList.add("frutilla")
                        break;
                    case SERPIENTE:
                        this.casillas[i][j].casillaElement.className = "casilla";
                        this.casillas[i][j].casillaElement.classList.add("cabeza")
                        break;
                    default:

                }

            }
        }
    }
}

class tablero_serpiente extends tablero {
    constructor() {
        super();
        //vamos a pintar bordes
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                if (i == 0 || i == DIM - 1 || j == 0 || j == DIM - 1) {
                    //es un borde
                    this.casillas[i][j].casillaElement.classList.add("borde");
                    this.casillas[i][j].tipo = BORDE;
                } else {
                    this.casillas[i][j].casillaElement.classList.add("fondo");
                    this.casillas[i][j].tipo = FONDO;
                }
            }
        }
  

        for(let i=0;i<NUMERO_FRUTILLAS;i++){
            this.generafrutilla();

        }

    }
    generafrutilla(numero) {
        //let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        let frutillaI, frutillaJ;
        let cont = 0;
        do {
            frutillaI = Math.floor(Math.random() * ((DIM - 2) - 1 + 1)) + 1;
            frutillaJ = Math.floor(Math.random() * ((DIM - 2) - 1 + 1)) + 1;
           
        } while (this.casillas[frutillaI][frutillaJ].tipo != FONDO)
        this.casillas[frutillaI][frutillaJ].casillaElement.className = "casilla"; //quito todas las clases menos casilla
        this.casillas[frutillaI][frutillaJ].casillaElement.classList.add("frutilla"); //quito todas las clases menos casilla
        this.casillas[frutillaI][frutillaJ].tipo = FRUTILLA;
    }

}

class casilla {
    constructor(i, j, tam) {
        this.posicionI = i;
        this.posicionJ = j;
        this.casillaElement = document.createElement("div");
        this.casillaElement.classList.add("casilla");
        this.casillaElement.style.width = `${tam}px`;
        this.casillaElement.style.height = `${tam}px`;

        this.tipo = PRIMIGENIO;
    }
}

class serpiente {
    constructor(tamano_inicial, tablero, game) {
        // console.log(`creando serpiente de ${tamano_inicial} elementos en el tablero`)
        this.tablero = tablero; //referencia al tablero donde jugara la serpiente
        this.game = game; //referencia al juego donde se esta jugando
        this.tamano = tamano_inicial;
        this.direccionAnterior=null;
        this.cuerpo = new Array();

        const cabeza = new cabeza_serpiente
        this.cuerpo.push(cabeza);
        this.tablero.casillas[cabeza.posicionI][cabeza.posicionJ].casillaElement.className = "";
        this.tablero.casillas[cabeza.posicionI][cabeza.posicionJ].casillaElement.classList.add("casilla");
        this.tablero.casillas[cabeza.posicionI][cabeza.posicionJ].casillaElement.classList.add("cabeza");
        this.tablero.casillas[cabeza.posicionI][cabeza.posicionJ].tipo = SERPIENTE

        if (this.tamano > 1) {
            for (let i = 1; i < this.tamano; i++) { //solo se ejecuta para tamaños mayores de 1
                const cuerpoTemporal = new cuerpo_serpiente((Math.floor(DIM / 2)) + i, Math.floor(DIM / 2)); //pongo segmentos debajo
                this.cuerpo.push(cuerpoTemporal);
                this.tablero.casillas[cuerpoTemporal.posicionI][cabeza.posicionJ].casillaElement.className = "";
                this.tablero.casillas[cuerpoTemporal.posicionI][cabeza.posicionJ].casillaElement.classList.add("casilla");
                this.tablero.casillas[cuerpoTemporal.posicionI][cabeza.posicionJ].casillaElement.classList.add("cuerpo");
                this.tablero.casillas[cuerpoTemporal.posicionI][cabeza.posicionJ].tipo = SERPIENTE
            }
        }

    }

    mueve(direccionFutura,direccionActual) {
        let cambiarDireccion = false;
        
        switch (direccionFutura) {
            case ARRIBA:
                switch (this.tablero.casillas[this.cuerpo[0].posicionI - 1][this.cuerpo[0].posicionJ].tipo) {
                    case FONDO:
                        cambiarDireccion = true;
                        break;
                    case FRUTILLA:
                        cambiarDireccion = true;
                        this.tablero.generafrutilla();
                        this.nuevoSegmento()
                        break;
                    case SERPIENTE:
                    
                        
                        break;
                    case BORDE:
                        this.cuerpo[0].posicionFuturaI = DIM - 2; //entra por abajo, DIM-1 es el borde de abajo
                        this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ;
                        this.actualizaSerpiente();
                        break;
                    default: //no mueve
                }
                if (cambiarDireccion) {

                    this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI - 1;
                    this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ;
                    this.actualizaSerpiente();


                }else{
                    //donothing

                }

                break;
            case ABAJO:
                switch (this.tablero.casillas[this.cuerpo[0].posicionI + 1][this.cuerpo[0].posicionJ].tipo) {
                    case FONDO:
                        cambiarDireccion = true;
                        break;
                    case FRUTILLA:
                        cambiarDireccion = true;
                        this.tablero.generafrutilla();
                        this.nuevoSegmento()
                        break;
                    case SERPIENTE:
                        //alert("derrota");
                        break;
                    case BORDE:
                        this.cuerpo[0].posicionFuturaI = 1; //entra por arriba, la fila 1, ya q la 0 es borde
                        this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ;
                        this.actualizaSerpiente();
                        break;
                    default: //no mueve
                }
                if (cambiarDireccion) {

                    this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI + 1;
                    this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ;
                    this.actualizaSerpiente();


                }
                break;
            case IZQUIERDA:
                switch (this.tablero.casillas[this.cuerpo[0].posicionI][this.cuerpo[0].posicionJ - 1].tipo) {
                    case FONDO:
                        cambiarDireccion = true;
                        break;
                    case FRUTILLA:
                        cambiarDireccion = true;
                        this.tablero.generafrutilla();
                        this.nuevoSegmento();
                        break;
                    case SERPIENTE:
                        //alert("derrota");
                        break;
                    case BORDE:
                        this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI;
                        this.cuerpo[0].posicionFuturaJ = DIM - 2;
                        this.actualizaSerpiente();
                        break;
                    default: //no mueve
                }
                if (cambiarDireccion) {

                    this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI;
                    this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ - 1;
                    this.actualizaSerpiente();


                }
                break;
            case DERECHA:
                switch (this.tablero.casillas[this.cuerpo[0].posicionI][this.cuerpo[0].posicionJ + 1].tipo) {
                    case FONDO:
                        cambiarDireccion = true;
                        break;
                    case FRUTILLA:
                        cambiarDireccion = true;
                        this.tablero.generafrutilla();
                        this.nuevoSegmento()
                        break;
                    case SERPIENTE:
                        //alert("derrota");
                        break;
                    case BORDE:
                        this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI;
                        this.cuerpo[0].posicionFuturaJ = 1;
                        this.actualizaSerpiente();
                        break;
                    default: //no mueve
                }
                if (cambiarDireccion) {

                    this.cuerpo[0].posicionFuturaI = this.cuerpo[0].posicionI;
                    this.cuerpo[0].posicionFuturaJ = this.cuerpo[0].posicionJ + 1;
                    this.actualizaSerpiente();


                }
                break;



        }

    }
    parar(){
        console.log(`la serpiente se para`);
        if(true){
            //verificar si quieres finalizar el juego
            this.game.finalizar();
        }
    }
    nuevoSegmento() {
        console.log(`NUEVO SEGMENTO`);
    
        this.tamano++;
      
        this.cuerpo.push(new cuerpo_serpiente(this.cuerpo[this.tamano - 2].posicionI, this.cuerpo[this.tamano - 2].posicionJ)); //creo otro elemento y lo solapo exactamente en el ultimo elemento que es tam-2 ya que he incrementado uno, no hay problema con que los 2 ultimos elementos sean "el mismo" ya que ahora al actualizar se mueven todos copiando la direccion del anteiror de manera que el ultimo copiara la direccion del penultimo que en este caso es la misma y no se movera, actualizandose corerctamente. Realmente daria igual donde colocara el semgento siempre que no fuera muro o frutilla
        for (let i = 0; i < this.tamano; i++) {
      
        }

    }
    actualizaSerpiente() {
        //se supone que la cabeza ya se ha movido
        //console.log("ACTUALIZA SERPIENTE\n");
        //primero borro la cola y luego actualizo el resto
        this.tablero.casillas[this.cuerpo[this.tamano - 1].posicionI][this.cuerpo[this.tamano - 1].posicionJ].casillaElement.className = "";
        this.tablero.casillas[this.cuerpo[this.tamano - 1].posicionI][this.cuerpo[this.tamano - 1].posicionJ].casillaElement.classList.add("casilla");
        this.tablero.casillas[this.cuerpo[this.tamano - 1].posicionI][this.cuerpo[this.tamano - 1].posicionJ].casillaElement.classList.add("fondo");
        this.tablero.casillas[this.cuerpo[this.tamano - 1].posicionI][this.cuerpo[this.tamano - 1].posicionJ].tipo = FONDO;



        for (let i = 0; i < this.tamano; i++) {
            //desde la cola actualizo segmentos y como i nunca será cero, la cabeza no se ve afectada

            //console.log(`cambiando el elemento ${i} que tiene una posicion ${this.cuerpo[i].posicionI}  ${this.cuerpo[i].posicionJ}`);

            if (i != this.tamano - 1) {
                this.cuerpo[i + 1].posicionFuturaI = this.cuerpo[i].posicionI; //guardo para la siguiente posicion, pero la última no la tengo que guardar, ya que i+1 no existe, y no tiene sentido
                this.cuerpo[i + 1].posicionFuturaJ = this.cuerpo[i].posicionJ;
            }
            this.cuerpo[i].posicionI = this.cuerpo[i].posicionFuturaI;
            this.cuerpo[i].posicionJ = this.cuerpo[i].posicionFuturaJ;



            this.tablero.casillas[this.cuerpo[i].posicionI][this.cuerpo[i].posicionJ].casillaElement.className = "";
            this.tablero.casillas[this.cuerpo[i].posicionI][this.cuerpo[i].posicionJ].casillaElement.classList.add("casilla");

            if (i == 0) { //si la i es cero, debe ser la cabeza
                this.tablero.casillas[this.cuerpo[i].posicionI][this.cuerpo[i].posicionJ].casillaElement.classList.add("cabeza");
            }
            else {
                this.tablero.casillas[this.cuerpo[i].posicionI][this.cuerpo[i].posicionJ].casillaElement.classList.add("cuerpo");
            }
            this.tablero.casillas[this.cuerpo[i].posicionI][this.cuerpo[i].posicionJ].tipo = SERPIENTE

            //console.log(`POSICIONES DE LA SERPIENTE elemento ${i} que tiene una posicion ${this.cuerpo[i].posicionI}  ${this.cuerpo[i].posicionJ}`);
        }
    }
}
class segmento_serpiente {
    constructor() {
        this.posicionI = 0;
        this.posicionJ = 0;
        this.posicionFuturaI = 0;
        this.posicionFuturaJ = 0;
    }
}

class cabeza_serpiente extends segmento_serpiente {
    constructor() {
        super();
        this.posicionI = Math.floor(DIM / 2)
        this.posicionJ = Math.floor(DIM / 2)
        //console.log(`cabeza serpiente creada en posicion ${this.posicionI} ${this.posicionJ}`)
    }
}
class cuerpo_serpiente extends segmento_serpiente {
    constructor(posI, posJ) {
        super();
        this.posicionI = posI;
        this.posicionJ = posJ;
    }
}

class game{
    constructor(){
        this.tablero = new tablero_serpiente();
        this.serpiente = new serpiente(TAM_SERPTIENTE, this.tablero, this); //le paso this, para que desde serpiente pueda hacer this.game.finalizar() para llamar a finalizar el jeugo
        
        this.direccionActual= ARRIBA; //inicio en algun valor, no es relevante, pero q no sea null
        this.siguiente_direccion = null;
        this.intervalo = null; //intervalo UNICO para actualizar la serpiente
        this.derrota = false;
    }
    empezar(direccion){
        this.direccionActual = direccion;
        this.siguiente_direccion = direccion;
        if (!this.intervalo) {
            this.intervalo = setInterval(() => {
                //console.log(`vamos a mover la serpiente pero ANTES DE MOVER MIRA ESTO`)
                //console.log(`direccion actual serpiente es ${this.direccionActual}`)
                //console.log(`direccion futura serpiente es ${this.siguiente_direccion}`)
                this.serpiente.mueve(this.siguiente_direccion,this.direccionActual);
                if(this.derrota){
                    console.log("NO DEBERIA VERSE ESTO, deberia haberse liberado el intervalPRUEBA")
                }
                
            }, VELOCIDAD);
            
        }

    }

    cambiarDireccionSerpiente(nuevaDireccion){
        if(this.direccionActual!=this.siguiente_direccion){
            this.direccionActual=this.siguiente_direccion;
            this.siguiente_direccion=nuevaDireccion;
        }
        else {
             this.direccionActual=this.siguiente_direccion;
            this.siguiente_direccion=nuevaDireccion;
            //donothing, se supone que si las direcciones son iguales no debe actualizar nada
        }
    }
    finalizar(){
        
        this.derrota = true;
       
       
        setTimeout(() => {
            alert("FIN DEL JUEGO");
        }, 500);
    }

    pausar(direccion){
        clearInterval(this.intervalo);
        this.intervalo = null; //intervalo debe ser null para que empezar lo setee
        if(confirm("juego pausado\n¿Quieres continuar? pulsa aceptar para continuar y cancelar para finalizar")){
            this.empezar(direccion);
            console.log("deberia emepezar")
        }
        else{this.finalizar();}
        
    }
}

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

 - - - - - - - empieza el programa - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/
//const tablero1 = new tablero_serpiente();
//const serpiente1 = new serpiente(1, tablero1);
//let siguiente_direccion = ARRIBA; //direccion por defecto, por ejemplo al empezar el juego
const juegoSerpiente = new game();
juegoSerpiente.empezar(ABAJO);

document.body.addEventListener("keydown", (event) => {
    //event.preventDefault(); // Evita que la página haga scroll con las teclas
    switch (event.key) {
        case "ArrowUp":
      //      console.log("tecla arriba presioanada");
            juegoSerpiente.cambiarDireccionSerpiente(ARRIBA);
            break;
        case "ArrowDown":
        //    console.log("tecla abajo presioanada");
            juegoSerpiente.cambiarDireccionSerpiente(ABAJO);
            break;
        case "ArrowLeft":
          //  console.log("tecla izda presioanada");
            juegoSerpiente.cambiarDireccionSerpiente(IZQUIERDA);
            break;
        case "ArrowRight":
            //console.log("tecla derecha presioanada");
            juegoSerpiente.cambiarDireccionSerpiente(DERECHA);
            break;
        case "m": //en caso de presionar "" se pausa el programa y se muestran los tipos de casillas
        case "M":

            juegoSerpiente.tablero.muestraTipo();
            break;

        case " ": //en caso de presionar "espacio" o p se pausa el programa
        case "p":
        case "P":
            juegoSerpiente.pausar(game.direccionActual)
            break;
        default:
            console.log("tecla sin funcion presionada");

            break;


    }



})

document.body.addEventListener("click", (event) => {
    console.log(`coordenadas del click x = ${event.clientX} y = ${event.clientY}`)
    const dimensiones_tablero= juegoSerpiente.tablero.tableroHTML.getBoundingClientRect();
    console.log(`coordenadas del tablero borde superior < ${Math.floor(dimensiones_tablero.top)}`)
    console.log(`coordenadas del tablero borde inferior > ${Math.floor(dimensiones_tablero.bottom)}`)
    console.log(`coordenadas del tablero borde derecha > ${Math.floor(dimensiones_tablero.right)}`)
    console.log(`coordenadas del tablero borde izda < ${Math.floor(dimensiones_tablero.left)}`)
    if(event.clientX > Math.floor(dimensiones_tablero.right) && event.clientY>Math.floor(dimensiones_tablero.top)&& event.clientY<Math.floor(dimensiones_tablero.bottom)){
        juegoSerpiente.cambiarDireccionSerpiente(DERECHA);
    }else if(event.clientX < Math.floor(dimensiones_tablero.left) && event.clientY>Math.floor(dimensiones_tablero.top)&& event.clientY<Math.floor(dimensiones_tablero.bottom)){
        juegoSerpiente.cambiarDireccionSerpiente(IZQUIERDA);
    }
    if(event.clientY < Math.floor(dimensiones_tablero.top) && event.clientX<Math.floor(dimensiones_tablero.right)&& event.clientX>Math.floor(dimensiones_tablero.left)){
        juegoSerpiente.cambiarDireccionSerpiente(ARRIBA);
    }else if(event.clientY > Math.floor(dimensiones_tablero.bottom) && event.clientX<Math.floor(dimensiones_tablero.right)&& event.clientX>Math.floor(dimensiones_tablero.left)){
        juegoSerpiente.cambiarDireccionSerpiente(ABAJO);
    }

});
