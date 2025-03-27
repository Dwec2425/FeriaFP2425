const ALTURA_ANCHURA = 500; //no tocar
const DIMENSION_PUZLE = 4;
const NUM_PIEZAS = DIMENSION_PUZLE * DIMENSION_PUZLE;

const general = document.getElementById("general");

// Crear botón de inicio
const boton = document.createElement("button");
boton.textContent = "Empezar";
boton.className = "boton";

// Crear contenedor de imagen
const imagen = document.createElement("div");
const imagenActual = "gato.jpg";
imagen.style.backgroundImage = `url(${imagenActual})`;
imagen.className = "imagen-puzle";
imagen.style.width = ALTURA_ANCHURA + "px";
imagen.style.height = ALTURA_ANCHURA + "px";

// Crear contenedor del puzle
const puzle = document.createElement("div");
puzle.className = "puzle";
puzle.style.width = ALTURA_ANCHURA + "px";
puzle.style.height = ALTURA_ANCHURA + "px";

// Inicializar array del puzle
let puzleArray = [];
for(let i = 1; i <= NUM_PIEZAS; i++){
    puzleArray.push(0);
}

function CrearPiezas(){
    let intervaloX = 0;
    let contadorX = -1;
    let contadorY = -1;
    let completadas = 0;
    
    puzleArray.forEach(() => {
        if(intervaloX % DIMENSION_PUZLE === 0){
            contadorX += 1;
        }
        intervaloX += 1;
        
        if(contadorY === DIMENSION_PUZLE - 1){
            contadorY = 0;
        }else{
            contadorY += 1;
        }
        
        // Crear cuadricula
        const cuadricula = document.createElement("div");
        cuadricula.className = "Vacio";
        cuadricula.style.height = Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS) + "px";
        cuadricula.style.width = Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS) + "px";
        cuadricula.ondragover = (arrastrar) => arrastrar.preventDefault();
        cuadricula.id = `cuadricula-${contadorY}-${contadorX}`;
        cuadricula.ondrop = (arrastrar) => {
            arrastrar.preventDefault();
            const id = arrastrar.dataTransfer.getData("text");
            const pieza = document.getElementById(id);
            
            // Verificar si la pieza está correctamente colocada
            if (pieza.correctamenteColocada) {
                return;
            }
            
            // Reemplazar pieza si ya hay una en la cuadricula
            if (cuadricula.firstChild && cuadricula.firstChild !== pieza) {
                const reemplazada = cuadricula.firstChild;
                if (reemplazada.correctamenteColocada) {
                    return;
                }
                general.appendChild(reemplazada);
                reemplazada.style.position = "absolute";
                reemplazada.style.left = (Math.random() * 31) + 7 + "%";
                reemplazada.style.top = (Math.random() * 62) + 12 + "%";
                reemplazada.reemplazada = true;
                if (reemplazada.correctamenteColocada) {
                    completadas -= 1;
                    reemplazada.correctamenteColocada = false;
                }
            }
            
            // Colocar pieza en la cuadricula
            cuadricula.appendChild(pieza);
            pieza.style.position = "relative";
            pieza.style.left = "0";
            pieza.style.top = "0";

            const cuadriculaId = cuadricula.id.replace('cuadricula-', '');
            const piezaId = pieza.id.replace('pieza-', '');

            // Verificar si la pieza está en la posición correcta
            if (cuadriculaId === piezaId && !pieza.correctamenteColocada) {
                completadas += 1;
                pieza.correctamenteColocada = true;
                pieza.draggable = false;
            } else if (cuadriculaId !== piezaId && pieza.correctamenteColocada) {
                pieza.correctamenteColocada = false;
            }

            if (pieza.reemplazada) {
                pieza.reemplazada = false;
            }
            
            // Verificar si el puzle está completo
            if (completadas === NUM_PIEZAS) {
                setTimeout(() => {
                    mostrarPantallaReiniciar();
                }, 500);
            }
            console.log(completadas);
        };
    
        // Crear pieza del puzle
        const pieza = document.createElement("div");
        pieza.className = "pieza";
        pieza.id = `pieza-${contadorX}-${contadorY}`;
        pieza.draggable = true;
        pieza.ondragstart = (arrastrar) => {
            arrastrar.dataTransfer.setData("text", arrastrar.target.id);
        };
        pieza.style.backgroundImage = `url(${imagenActual})`;
        pieza.style.height = Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS) + "px";
        pieza.style.width = Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS) + "px";
        pieza.correctamenteColocada = false;
        pieza.reemplazada = false;
        
        let posicionesPiezasX = contadorX * (Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS));
        let posicionesPiezasY = contadorY * (Math.sqrt(ALTURA_ANCHURA * ALTURA_ANCHURA / NUM_PIEZAS));
    
        pieza.style.backgroundPosition = `-${posicionesPiezasX}px -${posicionesPiezasY}px`;
        pieza.style.left = (Math.random() * 31) + 7 + "%";
        pieza.style.top = (Math.random() * 62) + 12 + "%";
        general.appendChild(pieza);
    
        puzle.appendChild(cuadricula);
    });
}

// Mostrar pantalla de reinicio
function mostrarPantallaReiniciar() {
    const pantallaReiniciar = document.createElement("div");
    pantallaReiniciar.className = "pantalla-reiniciar";
    pantallaReiniciar.innerHTML = 
    "<div class='mensaje-reiniciar'><h2>¡Has ganado!</h2><button id='reiniciar'>Reiniciar</button></div>";
    general.appendChild(pantallaReiniciar);

    document.getElementById("reiniciar").addEventListener("click", () => {
        location.reload();
    });
}

// Añadir elementos al DOM
general.appendChild(imagen);
general.appendChild(boton);
general.appendChild(puzle);

// Evento click para el botón
boton.addEventListener("click", () => {
    imagen.style.width = ALTURA_ANCHURA / 3 + "px";
    imagen.style.height = ALTURA_ANCHURA / 3 + "px";
    imagen.style.left = 55 + "%";
    imagen.style.border = 3 + "px solid rgb(0, 255, 0)";
    CrearPiezas();
    puzle.style.display = "flex";
    general.removeChild(boton);
});