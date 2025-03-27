class Hormiga {
    constructor() { 
        //generar posicion aleatoria y crear hormiga
        this.x = Math.floor(Math.random() * padreX);
        this.y = Math.floor(Math.random() * padreY);
        this.intervaloAleatorio = Math.floor(Math.random() * 11) + 40;
        this.hormiga = document.createElement("div");
        this.hormiga.className = "hormiga";
        padre.appendChild(this.hormiga);
        this.pararContador = false;
        
        this.hormiga.style.marginLeft = this.x + "px";
        this.hormiga.style.marginTop = this.y + "px";
        this.color();
        this.mover();
        this.eliminar();
    }

    color() {
        //genera un color aleatorio
        let colorAleatorio1 = Math.floor(Math.random() * 205) + 80;
        let colorAleatorio2 = Math.floor(Math.random() * 205) + 80;
        let colorAleatorio3 = Math.floor(Math.random() * 205) + 80;
        this.hormiga.style.backgroundColor = "rgb(" + colorAleatorio1 + ", " + colorAleatorio2 + ", " + colorAleatorio3 + ")";
    }

    mover() {
        let contador = 0;
        let direccion;
        setInterval(() => {
            //intervalo constante
            if(this.pararContador == false){
                contador++;
            }
            //un intervalo aleatorio decide cuando la hormiga cambia de direccion
            if (contador == this.intervaloAleatorio) {
                //20% de probabilidad de no moverse
                direccion = Math.floor(Math.random() * 10);
                contador = 0;
            }
            switch (direccion) {
                case 0: // mover derecha
                    if (this.x < padreX) this.x += 1;
                    this.hormiga.style.transform = "rotate(0deg)";
                    break;
                case 1: // mover abajo derecha
                    if (this.y < padreY) this.y += 1;
                    if (this.x < padreX) this.x += 1;
                    this.hormiga.style.transform = "rotate(45deg)";
                    break;
                case 2: // mover abajo
                    if (this.y < padreY) this.y += 1;
                    this.hormiga.style.transform = "rotate(90deg)";
                    break;
                case 3: // mover abajo izquierda
                    if (this.y < padreY) this.y += 1;
                    if (this.x > 0) this.x -= 1;
                    this.hormiga.style.transform = "rotate(135deg)";
                    break;
                case 4: // mover izquierda
                    if (this.x > 0) this.x -= 1;
                    this.hormiga.style.transform = "rotate(180deg)";
                    break;
                case 5: // mover arriba izquierda
                    if (this.y > 0) this.y -= 1;
                    if (this.x > 0) this.x -= 1;
                    this.hormiga.style.transform = "rotate(225deg)";
                    break;
                case 6: // mover arriba
                    if (this.y > 0) this.y -= 1;
                    this.hormiga.style.transform = "rotate(270deg)";
                    break;
                case 7: // mover arriba derecha
                    if (this.y > 0) this.y -= 1;
                    if (this.x < padreX) this.x += 1;
                    this.hormiga.style.transform = "rotate(315deg)";
                    break;
            }
            this.hormiga.style.marginLeft = this.x + "px";
            this.hormiga.style.marginTop = this.y + "px";
        }, 10);
    }

    eliminar() {
        //cuenta los clicks en cada hormiga
        let contarClicks = 0;
        this.hormiga.addEventListener('click', () => {
            //cada vez se hace click la hormiga cambia de color
            this.color();
            contarClicks++;
            //cuando llega a 3 clicks
            if (contarClicks == 3) {
                //detiene de aumento del contador
                this.pararContador = true;
                //la hormiga se elimina
                this.hormiga.removeEventListener('click', this.eliminar.bind(this));
                this.hormiga.remove();
                //se suma una hormiga matada y se muestra las hormigas matadas y la cantidad total
                hormigasMatadas++;
                info.innerHTML = hormigasMatadas + " / " + cantidadHormigas;
                //cuando las hormigas matadas son las mismas que la cantidad total
                if (hormigasMatadas === cantidadHormigas) {
                    //cuando ganas

                    //se elimina el texto de info
                    info.remove();
                    hormigasMatadas = 0;
                    //se detiene y se elimina el texto del temporizador
                    clearInterval(intervaloTemporizador);
                    temporizadorTexto.remove();
                    //+1 al contador de oleadas
                    oleada++;
                    //se muestra el boton para continuar
                    mostrarBotonSiguienteOleada();
                }
            }
        });
    }
}

function crearHormigas(cantidad) {
    //se crean hormigas segun la cantidad introducida
    for (let i = 0; i < cantidad; i++) {
        new Hormiga();
    }
    //se muestra las hormigas matadas y la cantidad total
    cantidadHormigas = cantidad;
    info.innerHTML = hormigasMatadas + " / " + cantidadHormigas;
}

function mostrarBotonSiguienteOleada() {
    //se crea un nuevo boton de siguiente oleada
    botonSiguienteOleada = document.createElement("button");
    botonSiguienteOleada.innerHTML = "Siguiente Oleada";
    botonSiguienteOleada.className = "boton-centro";
    oleadaTexto = document.createElement("p");
    oleadaTexto.className = "info";
    //se muestra la oleada actual
    oleadaTexto.innerHTML = "Oleada " + oleada;
    padre.appendChild(oleadaTexto);
    botonSiguienteOleada.addEventListener('click', () => {
        //cuando se pulsa el boton y la oleada se eliminan
        botonSiguienteOleada.remove();
        oleadaTexto.remove();
        //se crean las dos hormigas extra cada oleada
        crearHormigas(cantidadHormigas + 2);
        //se muestra la info y el temporizadador
        padre.appendChild(info);
        iniciarTemporizador();
    });
    padre.appendChild(botonSiguienteOleada);
    padre.appendChild(oleadaTexto);
}

function iniciarTemporizador() {
    //el temporizador comienza en 14 y se suman 4 cada oleada y se muestra
    let tiempo = 14 + (oleada - 1) * 4;
    temporizadorTexto.innerHTML = `Tiempo restante: ${tiempo}s`;
    padre.appendChild(temporizadorTexto);
    intervaloTemporizador = setInterval(() => {
        //cada 1000 milisegundos el temporizador resta 1 y se muestra
        tiempo--;
        temporizadorTexto.innerHTML = `Tiempo restante: ${tiempo}s`;
        //si el tiempo es 0 o menos se muestra un boton de reiniciar
        if (tiempo <= 0) {
            //cuando pierdes
            mostrarBotonReintentar();
        }
    }, 1000);
}

function mostrarBotonReintentar() {
    //se crea y muestra el boton reiniciar el cual recarga la pagina
    botonReintentar = document.createElement("button");
    botonReintentar.innerHTML = "Reintentar";
    botonReintentar.className = "boton-reintentar";
    botonReintentar.addEventListener('click', () => {
        location.reload();
    });
    padre.innerHTML = '';
    padre.appendChild(botonReintentar);
}

//div padre al cual se le añade todo el programa
padre = document.getElementById("padre");
padreX = padre.offsetWidth - 52;
padreY = padre.offsetHeight - 52;

//cantidad inicial de todos los valores
let cantidadHormigas = 0;
let hormigasMatadas = 0;
let oleada = 1;
let intervaloTemporizador;

//mostrar boton iniciar
boton = document.createElement("button");
boton.innerHTML = "Iniciar";
boton.className = "boton-centro";
boton.id = "iniciar";
padre.appendChild(boton);

//añadir id y clase a info
info = document.createElement("p");
info.className = "info";
info.id = "info";

//mostrar la oleada
oleadaTexto = document.createElement("p");
oleadaTexto.className = "info";
oleadaTexto.innerHTML = "Oleada " + oleada;
padre.appendChild(oleadaTexto);

//añadir una clase al temporizador
temporizadorTexto = document.createElement("p");
temporizadorTexto.className = "info temporizador";

document.getElementById("iniciar").addEventListener('click', () => {
    //cuando se pulsa el boton y la oleada se eliminan
    document.getElementById("iniciar").remove();
    oleadaTexto.remove();
    crearHormigas(4);
    padre.appendChild(info);
    //se inicia el temporizador
    iniciarTemporizador();
});