const tablero = document.getElementById("tablero");
class app {
    constructor() {
        this.cargar();
    }
    cargar() {

    }


}
class baraja {
    constructor(num) {
        const palos = ["oros", "copas", "espadas", "bastos"];
        this.numeroCartasTotal = num;
        this.cartas = [];
        let cont = 0;
        for (let j = 0; j < 4; j++) {
            for (let i = 1; i <= this.numeroCartasTotal / palos.length; i++) {
                this.cartas.push(new carta(++cont, i, palos[j]));
            }
        }
    }
    muestraEnDOM() {
        this.cartas.forEach(element => {
            tablero.appendChild(element.div);
        })
    }
    barajar() {
        this.cartas = desordenarArray(this.cartas)
        function desordenarArray(array) {
            //ESTE ES EL ALGORITMO FISHER YATES
            //Es muy sencillo e ingenioso, rcorre el array desde el final de uno en uno y cambia el elmento por otro desde si mismo hasta el primero
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
            }
            return array;
        }

    }
}

class carta {
    constructor(id, num, palo) {
        this.id = id;
        this.numero = num;
        this.palo = palo;
        this.disposicion = new Array(9);
        this.div = this.creaHTML();
    }
    creaHTML() {
        const div = document.createElement("div");
        div.id = this.id;
        div.classList.add("carta");
        div.classList.add(this.palo);
        this.creaDisposicion();
        this.disposicion.forEach((element, index) => {
            div.appendChild(this.disposicion[index])
        })
        return div;
    }
    creaDisposicion() {
        for (let i = 0; i < this.disposicion.length; i++) {
            this.disposicion[i] = document.createElement("p");
            this.disposicion[i].textContent = " ";
        }
        this.disposicion[0].textContent = this.numero
        this.disposicion[2].textContent = this.numero
        this.disposicion[4].textContent = this.palo
        this.disposicion[6].textContent = this.numero
        this.disposicion[8].textContent = this.numero

    }

    muestra() {
        return `Se muestra la carta: ${this.numero} de ${this.palo}`
    }

}

const baraja1 = new baraja(48);
if (window.innerWidth < 500) {
    //es un movil (o pantalla pequeña)
    addBotonera();
    

    function addBotonera(){
        const botonera = document.createElement("div");
        botonera.classList.add("botonera");
        document.body.appendChild(botonera);
        

    
    
        const baraja_button = document.createElement("input");
        baraja_button.setAttribute("type", "button");
        baraja_button.setAttribute("value", "Barajar");
        baraja_button.style.float = "left";
        botonera.appendChild(baraja_button)
        const repartir_button = document.createElement("input");
        repartir_button.setAttribute("type", "button");
        repartir_button.setAttribute("value", "Empezar");
        botonera.appendChild(repartir_button)

    }
} else {
    //es un ordenador (o pantalla mas grande)
    const instrucciones_p = document.createElement("p");
    instrucciones_p.textContent = "presiona f4 para barajar y f5 para repartir";
    document.body.appendChild(instrucciones_p)


    document.addEventListener("keydown", (e) => {
        if (e.key == "F4") {
            e.preventDefault();
            baraja1.barajar();
            baraja1.muestraEnDOM();
        }

    })
}
baraja1.muestraEnDOM();
