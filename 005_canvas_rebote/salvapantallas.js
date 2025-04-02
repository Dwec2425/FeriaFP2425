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


let pelota = { x: canvas.width / 2, dx: DERECHA, y: canvas.height / 2, dy: ARRIBA, r: RADIO };

const img = new Image();
img.src="JDV.png"
let imagen = {html:img, url:img.src, x: canvas.width / 4, dx: DERECHA, y: canvas.height / 4, dy: ARRIBA, r: SIZELOGO };

img.onload = ()=>{
requestAnimationFrame(animar);
}

function animar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


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