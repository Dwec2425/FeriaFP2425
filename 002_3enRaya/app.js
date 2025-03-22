const PLAYERS = 1;
const P1 = 1;
const P2 = 2;
const CPU = 3;

const game_parent = document.getElementById("game_parent");
const info_game = document.getElementById("info_game");
const info_parrafo = info_game.children[0];
class game {
    constructor() {
        this.numplayers = null;
        this.ganador="empate";
        this.player1 = null;
        this.player2 = null;
        this.tablero = null;
        this.turno = 2; //haremos turnos por par o impar, empieza par
        this.fin = false;
        this.creaFormulario(); //el formulario genera lo necesario para que se cree el juego



    }

    creaFormulario() {
        console.log('creando formulario');


        const formulario = document.createElement("form");
        formulario.classList.add("formulario");
        game_parent.appendChild(formulario);

        const numPlayersLabel = document.createElement("label");
        numPlayersLabel.textContent = "numero de jugadores";
        formulario.appendChild(numPlayersLabel);



        const numPlayersInput = document.createElement("input");
        numPlayersInput.type = "number";
        numPlayersInput.value = PLAYERS;
        formulario.appendChild(numPlayersInput);

        const novalid = document.createElement("label");
        novalid.textContent = "numero de jugadores invalido, debe ser 1 o 2";
        novalid.classList.add("numjugbad")
        formulario.appendChild(novalid);

        const boton_settings_formulario = document.createElement("input");
        boton_settings_formulario.type = "button";
        boton_settings_formulario.value = "empezar";
        formulario.appendChild(boton_settings_formulario);
        boton_settings_formulario.addEventListener("click", (event) => {
            if (numPlayersInput.value > 2 || numPlayersInput.value < 1) {
                novalid.style.visibility = "visible";
                console.log(`settigs NOK, num players = ${numPlayersInput.value}`)
            }
            else {
                console.log(`settigs ok, num players = ${numPlayersInput.value}`)
                this.numplayers = numPlayersInput.value;
                this.creaJuego(this.numplayers, formulario);

            }
        });
        console.log('Formulario creado');
       // setTimeout(() => { boton_settings_formulario.click(); }, 700);


    }

    creaJuego(numplayers, formulario) {
        game_parent.removeChild(formulario);
        console.log('Formulario eliminado');
        info_parrafo.textContent += `juego creado para ${numplayers} jugadores`;
        this.tablero = new tablero(this)

        if (numplayers == 2) {
            console.log(`creando el juego para 2 players`)
            this.player1 = new player("P1", this.tablero);
            this.player2 = new player("P2", this.tablero);

        }
        else {
            console.log(`creando el juego para 1 player contra Cpu`)
            this.player1 = new cpu("CPU", this.tablero);
            this.player2 = new player("P2", this.tablero);

        }
        this.tablero.setPlayers(this.player1, this.player2);
        this.juega(this.turno);
    }
    juega(turno) {
        this.fin = this.compruebaVictoria();
        if (this.fin != true) {
            if (turno % 2 == 0) {
                //siturno par juega player 1
                info_parrafo.innerHTML += `<br><br>turno de player 1`;
                console.log(`turno de player 1`);
                console.log(`nombre del plyaer 1 = ${this.player1.nombre}`);
                
                if(this.player1.nombre=="CPU"){
                    this.tablero.player = CPU;
                    let prueba = Math.floor(Math.random()*9); //random de 0 a 8
                    let escape=0;
                    let salir=false;
                    while(!salir && escape<9){
                        if(this.tablero.casillasHTML[prueba].getAttribute('value')==""){
                            //casilla libre
                            this.tablero.casillasHTML[prueba].click();
                            salir=true;
                        }else{
                            prueba = Math.floor(Math.random()*9); //random de 0 a 8
                        }
                        escape++;
                    }
                    
                    
                }else{
                    this.tablero.player = P1;}
                
            } else {
                console.log(`turno de player 2`)
                console.log(`nombre del plyaer 2 = ${this.player2.nombre}`);
                info_parrafo.innerHTML += `<br><br>turno de player 2`;
                this.tablero.player = P2;
            }
        }else{alert(`ganador = ${this.ganador}`)}


    }
    compruebaVictoria() {
        let cont = 0;
        for (let i = 0; i < this.tablero.casillasHTML.length; i++) {
            console.log(`casilla ${i} tiene un valor de ${this.tablero.casillasHTML[i].getAttribute('value')}`);
            if (this.tablero.casillasHTML[i].getAttribute('value') != "") cont++;

        }
        //filas p1
        if(this.tablero.casillasHTML[0].getAttribute('value')=='X'&&this.tablero.casillasHTML[1].getAttribute('value')=='X'&&this.tablero.casillasHTML[2].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[3].getAttribute('value')=='X'&&this.tablero.casillasHTML[4].getAttribute('value')=='X'&&this.tablero.casillasHTML[5].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[6].getAttribute('value')=='X'&&this.tablero.casillasHTML[7].getAttribute('value')=='X'&&this.tablero.casillasHTML[8].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        //columnas p1
        if(this.tablero.casillasHTML[0].getAttribute('value')=='X'&&this.tablero.casillasHTML[3].getAttribute('value')=='X'&&this.tablero.casillasHTML[6].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[1].getAttribute('value')=='X'&&this.tablero.casillasHTML[4].getAttribute('value')=='X'&&this.tablero.casillasHTML[7].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[2].getAttribute('value')=='X'&&this.tablero.casillasHTML[5].getAttribute('value')=='X'&&this.tablero.casillasHTML[8].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        //diagonales p1
        if(this.tablero.casillasHTML[0].getAttribute('value')=='X'&&this.tablero.casillasHTML[4].getAttribute('value')=='X'&&this.tablero.casillasHTML[8].getAttribute('value')=='X'){
            this.ganador=this.player1.nombre;
            return true;
        }
        //filas p2
        if(this.tablero.casillasHTML[0].getAttribute('value')=='O'&&this.tablero.casillasHTML[1].getAttribute('value')=='O'&&this.tablero.casillasHTML[2].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[3].getAttribute('value')=='O'&&this.tablero.casillasHTML[4].getAttribute('value')=='O'&&this.tablero.casillasHTML[5].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[6].getAttribute('value')=='O'&&this.tablero.casillasHTML[7].getAttribute('value')=='O'&&this.tablero.casillasHTML[8].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        //columnas p2
        if(this.tablero.casillasHTML[0].getAttribute('value')=='O'&&this.tablero.casillasHTML[3].getAttribute('value')=='O'&&this.tablero.casillasHTML[6].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[1].getAttribute('value')=='O'&&this.tablero.casillasHTML[4].getAttribute('value')=='O'&&this.tablero.casillasHTML[7].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        if(this.tablero.casillasHTML[2].getAttribute('value')=='O'&&this.tablero.casillasHTML[5].getAttribute('value')=='O'&&this.tablero.casillasHTML[8].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }
        //diagonales p2
        if(this.tablero.casillasHTML[0].getAttribute('value')=='O'&&this.tablero.casillasHTML[4].getAttribute('value')=='O'&&this.tablero.casillasHTML[8].getAttribute('value')=='O'){
            this.ganador=this.player2.nombre;
            return true;
        }


        if (cont == 9) {
            return true;

        }
    }
}

class tablero {
    constructor(juego) {
        this.juego = juego;
        this.player = 0;
        this.casillasHTML = new Array(9);

        this.tableroHTML = document.createElement("div");
        this.tableroHTML.classList.add("tablero");
        game_parent.appendChild(this.tableroHTML);
        for (let i = 0; i < this.casillasHTML.length; i++) {
            this.casillasHTML[i] = document.createElement("div");
            this.casillasHTML[i].classList.add("casilla");
            this.casillasHTML[i].id = `casilla${i}`;
            this.casillasHTML[i].setAttribute("num", i);
            this.casillasHTML[i].setAttribute("value", "");

            this.tableroHTML.appendChild(this.casillasHTML[i]);
            
            this.casillasHTML[i].addEventListener("click", (e) => { this.manejador(e, this.casillasHTML[i]) })
        }
    }
    setPlayers(p1, p2) {
        this.player1 = p1;
        this.player2 = p2;

    }

    manejador(e, casilla) {
        let numCasilla = this.casillasHTML.indexOf(casilla);
        if (this.casillasHTML[numCasilla].getAttribute('value') == "") {
            //casilla libre
            console.log(`casilla ${numCasilla} libre`);
            if (this.player == P1 || this.player == CPU) {
                console.log(`el VALUE SERIA ${this.casillasHTML[numCasilla].getAttribute('value')}`);
                this.casillasHTML[numCasilla].classList.add("p1");
                this.casillasHTML[numCasilla].setAttribute('value', "X")
                console.log(`el VALUE SERIA ${this.casillasHTML[numCasilla].getAttribute('value')}`);

                info_parrafo.innerHTML += `<br><br>P1 juega en casilla ${numCasilla} `;
                this.juego.turno++;
                this.juego.juega(this.juego.turno);


            }
            else if(this.player == P2){
              
                this.casillasHTML[numCasilla].classList.add("p2");
                this.casillasHTML[numCasilla].setAttribute('value', "O");
                info_parrafo.innerHTML += `<br><br>P2 juega en casilla ${numCasilla} `;
                this.juego.turno++;
                this.juego.juega(this.juego.turno);
            }
        }
        else {
            //casilla ocupada, quita el listener
            console.log('casilla ocupada');
            console.log(`el VALUE SERIA ${this.casillasHTML[numCasilla].getAttribute('value')}`);



        }

    }
}
class player {
    constructor(nombre, tablero) {
        this.nombre = nombre;
        this.tablero = tablero; //referencia al tablero
        this.tipo = null;
        if (nombre == "CPU") { this.tipo = "CPU" } else this.tipo = "humano";
        console.log(`jugador creado: ${this.nombre}`);
    }

}

class cpu extends player{
    constructor(nombre, tablero) {
        super(nombre, tablero);
    }
    random(){

    }
}

const juego = new game();