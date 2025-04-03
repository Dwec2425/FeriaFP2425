const EQUIPO = 1 //escribe 1 para BARÇA 2 para Real Madrid y 0 para logo del IEs Juan García Valdemora

const DERECHA = 1;
const IZQUIERDA = -1;
const ABAJO = 1;
const ARRIBA = -1;

const VELOCIDAD = 6
const VELOCIDAD_LOGO=5
const RADIO = 10;
const SIZELOGO = 150;

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

let=nombreParaCanvas = "Escribe tu nombre";
let texto = { x: canvas.width / 2, dx: DERECHA, y: canvas.height / 2, dy: ARRIBA, ancho: 200, alto:50 };
const colores = ["red", "blue", "green", "purple", "orange"];
let indiceColores = 0;


let pelota = { x: canvas.width / 2, dx: DERECHA, y: canvas.height / 2, dy: ARRIBA, r: RADIO };

const img = new Image();

urlsImagenes = ["JDV.png","barca.png","rmcf.png"]

img.src= urlsImagenes[EQUIPO]
let imagen = {html:img, url:img.src, x: canvas.width / 4, dx: DERECHA, y: canvas.height / 4, dy: ARRIBA, r: SIZELOGO };

img.onload = ()=>{
requestAnimationFrame(animar);
}
let contadorFrames =0;
function animar() { 
    contadorFrames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial"; // Definir el estilo de fuente
    ctx.fillStyle = colores[indiceColores]; // Color del texto
    if(nombreParaCanvas ==="") nombreParaCanvas="Escribe tu nombre";
    ctx.fillText(nombreParaCanvas, texto.x, 50); // Dibujar el texto en la posición (x, 100)
    texto.x+=2;
    if (texto.x > canvas.width) {
        texto.x = -200;  // 200 es el ancho del texto (ajustar si es necesario)
    }
    if(contadorFrames>90){
        indiceColores=(indiceColores+1)%colores.length;
        contadorFrames=0;}

 


dibujarPelota();
animarPelota();

//colocarImagen();

    ctx.drawImage(imagen.html,imagen.x,imagen.y,imagen.r,imagen.r);



//animarLogo();
if (imagen.dx == DERECHA) {

    if (imagen.x < canvas.width - imagen.r) {
        imagen.x += VELOCIDAD_LOGO;

    } else { imagen.dx = IZQUIERDA; }
}

if (imagen.dx == IZQUIERDA) {
    if (imagen.x > 0) {
        imagen.x -= VELOCIDAD_LOGO;

    } else imagen.dx = DERECHA;
}
if (imagen.dy == ABAJO) {

    if (imagen.y < canvas.height - imagen.r) {
        imagen.y += VELOCIDAD_LOGO;

    } else { imagen.dy = ARRIBA; }
}

if (imagen.dy == ARRIBA) {
    if (imagen.y > 0) {
        imagen.y -= VELOCIDAD_LOGO;

    } else imagen.dy = ABAJO;
}
  


    requestAnimationFrame(animar)
}
function dibujarPelota(){
    ctx.beginPath();
    ctx.arc(pelota.x, pelota.y, pelota.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.stroke();
    ctx.fill();
}
function animarPelota(){
    if (pelota.dx == DERECHA) {

        if (pelota.x < canvas.width - pelota.r) {
            pelota.x += VELOCIDAD;

        } else { pelota.dx = IZQUIERDA; }
    }

    if (pelota.dx == IZQUIERDA) {
        if (pelota.x > pelota.r) {
            pelota.x -= VELOCIDAD;

        } else pelota.dx = DERECHA;
    }
    if (pelota.dy == ABAJO) {

        if (pelota.y < canvas.height - pelota.r) {
            pelota.y += VELOCIDAD;

        } else { pelota.dy = ARRIBA; }
    }

    if (pelota.dy == ARRIBA) {
        if (pelota.y > pelota.r) {
            pelota.y -= VELOCIDAD;

        } else pelota.dy = ABAJO;
    }

}


const listElements = document.querySelectorAll("li");
const inicio = listElements[0];
inicio.addEventListener("click",()=>{location.reload();})


const tuNombreLi = listElements[1];
tuNombreLi.innerHTML="";

const nombreLabel=document.createElement("label");
nombreLabel.innerHTML="escribe tu nombre"
tuNombreLi.appendChild(nombreLabel)

const nombreTxt = document.createElement("input");
nombreTxt.type="textBox"
nombreTxt.value="Pepe"
tuNombreLi.appendChild(nombreTxt)

const nombreBtn = document.createElement("input");
nombreBtn.type="button"
nombreBtn.value="Dale!"
tuNombreLi.appendChild(nombreBtn)

nombreBtn.addEventListener("click",()=>{
    nombreParaCanvas = nombreTxt.value;
    console.log(nombreParaCanvas);
})


