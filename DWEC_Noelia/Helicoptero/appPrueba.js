//variables
nave = document.getElementById("nave");
luna = document.getElementById("luna");
tierra = document.getElementById("tierra");
asteroide1 = document.getElementById("asteroide1");
asteroide2 = document.getElementById("asteroide2");
asteroide3 = document.getElementById("asteroide3");
condicionExplosion = false;

//bordes de la ventana
anchoPagina = window.innerWidth -4;
altoPagina = window.innerHeight;

//hitboxes "colisiones"
anchoNave = nave.offsetWidth;
altoNave = nave.offsetWidth;

anchoLuna = luna.offsetWidth;
altoLuna = luna.offsetWidth;

anchoTierra = tierra.offsetWidth-85;
altoTierra = tierra.offsetWidth-142;

anchoAsteroide1=asteroide1.offsetWidth;
altoAsteroide1=asteroide1.offsetWidth;
anchoAsteroide2=asteroide2.offsetWidth;
altoAsteroide2=asteroide2.offsetWidth;
anchoAsteroide3=asteroide3.offsetWidth;
altoAsteroide3=asteroide3.offsetWidth;

console.log("Alto pagina "+altoPagina);
console.log("Ancho pagina "+anchoPagina); 
console.log("Alto nave "+altoNave); 
console.log("Ancho "+anchoNave); 
console.log("Alto luna "+altoLuna); 
console.log("Ancho luna "+anchoLuna); 

ObjNave = {
    //variables de la nave
    Velocidad: 1,
    gravedad: 0.3,
    X: 0,
    Y: 0,

    iniciarGravedad(){
        //gravedad
        intervalo = setInterval(()=>{
            if(condicionExplosion == false){
                //para fuera de la tierra
                if(ObjNave.Y <= altoPagina - altoNave * 8.7 || 
                    ObjNave.Y >= altoPagina - altoNave * 5 || 
                    ObjNave.X <= anchoPagina - anchoLuna * 1.8){
                    if(this.X >= anchoTierra && this.Y <= altoTierra){
                        this.Y -= this.gravedad * ObjNave.Velocidad;
                    //cuando esta encima de la tierra
                    }else if(this.Y >= altoTierra){
                        if(this.Y <= 0){
                        }else{
                            //victoria
                            this.Y -= this.gravedad * ObjNave.Velocidad;
                            if(ObjNave.X + anchoNave*2.3 >= anchoPagina - anchoLuna && 
                            ObjNave.Y + altoNave * 3.5 >= altoPagina - altoPagina*0.2 - altoLuna &&
                            ObjNave.Y + altoNave * 3.5 <= altoPagina - altoPagina*0.2 + altoNave
                            ){
                                if(this.Velocidad <= 1.5){
                                    alert("¡Felicidades! Has aterrizado con éxito en la luna");
                                }else{
                                    nave.src = 'explosion1.png';
                                    luna.src = 'explosion1.png';
                                    condicionExplosion = true;
                                }
                            }  
                        }
                    //si se pasa se recoloca
                    }
                    if(this.Y <= -142){
                        this.Y = -142;
                    }
                }
            }
        }, 10);
    },
    mostrarDatos(){
        //mostrar coordenadas
        intervalo2 = setInterval(()=>{
            document.getElementById("cords").innerHTML = "X: " + this.X.toFixed(2) + "<br> Y: " + this.Y.toFixed(2);
            if(this.Velocidad <= 1){
                document.getElementById("velocidad").innerHTML = "0.00 Km/s";
            }else{
                document.getElementById("velocidad").innerHTML = this.Velocidad.toFixed(2) + " Km/s";
            }
        }, 10);
    },
    moverNave(){
        salirTierra = false;
        intervalo3 = setInterval(()=>{
            nave.style.marginLeft = this.X + "px";
            nave.style.marginBottom = this.Y + "px";

            if(salirTierra == true){
                if(condicionExplosion == false){
                    if(ObjNave.Velocidad <= 1){
                        nave.src = 'naveOkrec.png';
                    }else if(ObjNave.Velocidad <= 5 && ObjNave.Velocidad >= 1){
                        nave.src = 'naveOkpeq.png';
                    }else{
                        nave.src = 'naveok.png';
                    }
                }
            }
        });
    }
}
//creacion de los intervalos
let arriba, abajo, izquierda, derecha;
let disminuirVelocidad;

document.addEventListener("keydown", function(teclas){
    //pulsar teclas
    switch(teclas.key){
        case "w":
        case "W":
        case "ArrowUp":
            if(!arriba){
                arriba = setInterval(()=>{
                    if(condicionExplosion == false){
                        //movimiento
                        if(ObjNave.Velocidad <= 9.99){
                            ObjNave.Velocidad += 0.01;
                        }
                        //colision luna
                        if(ObjNave.Y <= altoPagina - altoNave * 8.7 || ObjNave.Y >= altoPagina - altoNave * 6 || ObjNave.X <= anchoPagina - anchoLuna * 1.8){
                            //techo
                            if(altoPagina >= ObjNave.Y + altoNave * 3.5){
                                ObjNave.Y += 0.5 * ObjNave.Velocidad;
                            }
                            clearInterval(disminuirVelocidad);
                            disminuirVelocidad = null;
                            if(ObjNave.Y >= altoTierra){
                                if(condicionExplosion == false){
                                    nave.src = 'naveOkpeq.png';
                                    salirTierra = true;
                                }
                            }
                        }else{
                            nave.src = 'explosion1.png';
                            luna.src = 'explosion1.png';
                            condicionExplosion = true;
                        }
                    }
                }, 10);
            }
            break;

        case "s":
        case "S":
        case "ArrowDown":
            if(!abajo){
                abajo = setInterval(()=>{
                    if(condicionExplosion == false){
                        //colision con la tierra
                        if(ObjNave.X <= anchoTierra-10 && ObjNave.Y <= altoTierra){
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                        //colision luna
                        }else if(ObjNave.Y <= altoLuna){
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                        }else{
                            if(ObjNave.Y <= altoPagina - altoNave * 8.7 || 
                                ObjNave.Y >= altoPagina - altoNave * 5 || 
                                ObjNave.X <= anchoPagina - anchoLuna * 1.8){
                                //movimiento
                                if(ObjNave.Y >= -135){
                                    if(ObjNave.Velocidad <= 9.99){
                                        ObjNave.Velocidad += 0.01;
                                    }
                                    ObjNave.Y -= 0.5 * ObjNave.Velocidad;
                                    clearInterval(disminuirVelocidad); 
                                    disminuirVelocidad = null;
                                }
                            }
                        }
                    }
                }, 10);
            }
            break;

        case "a":
        case "A":
        case "ArrowLeft":
            if(!izquierda){
                izquierda = setInterval(()=>{
                    if(condicionExplosion == false){
                        //colision con la tierra
                        if(ObjNave.X <= anchoTierra && ObjNave.Y <= altoTierra-10){
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                        }else{
                            //movimiento
                            if(ObjNave.X >= -anchoNave*1.4){
                                if(ObjNave.Velocidad <= 9.99){
                                    ObjNave.Velocidad += 0.01;
                                }
                                ObjNave.X -= 0.5 * ObjNave.Velocidad;
                                clearInterval(disminuirVelocidad); 
                                disminuirVelocidad = null;
                            }
                        }
                    }
                }, 10);
            }
            break;

        case "d":
        case "D":
        case "ArrowRight":
            if(!derecha){
                derecha = setInterval(()=>{
                    if(condicionExplosion == false){
                        //colision con la tierra
                        if(ObjNave.X <= anchoTierra-10 && ObjNave.Y <= altoTierra-10){
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                        //colision luna
                        }else if(
                            ObjNave.X + anchoNave*2.46 >= anchoPagina - anchoLuna && 
                            ObjNave.Y + altoNave * 3.5 >= altoPagina - altoPagina*0.2 - altoLuna &&
                            ObjNave.Y + altoNave * 3.6 <= altoPagina - altoPagina*0.2 + altoNave
                            ){
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                            nave.src = 'explosion1.png';
                            luna.src = 'explosion1.png';
                            condicionExplosion = true;
                        }else{
                            //movimiento
                            if(ObjNave.Velocidad <= 9.99){
                                ObjNave.Velocidad += 0.01;
                            }
                            //pared
                            if(anchoPagina >= ObjNave.X + anchoNave*2.46){
                                ObjNave.X += 0.5 * ObjNave.Velocidad;
                            }
                            clearInterval(disminuirVelocidad); 
                            disminuirVelocidad = null;
                        }
                    }
                }, 10);
            }
            break;
    }
});

document.addEventListener("keyup", function(teclas){
    //soltar teclas
    switch(teclas.key){
        case "w":
        case "W":
        case "ArrowUp":
            clearInterval(arriba);
            arriba = null;
            break;

        case "s":
        case "S":
        case "ArrowDown":
            clearInterval(abajo);
            abajo = null;
            break;

        case "a":
        case "A":
        case "ArrowLeft":
            clearInterval(izquierda);
            izquierda = null;
            break;

        case "d":
        case "D":
        case "ArrowRight":
            clearInterval(derecha);
            derecha = null;
            break;
    }

    //comenzar a bajar la velocidad al soltar una tecla
    if(!disminuirVelocidad){
        disminuirVelocidad = setInterval(()=>{
            if (ObjNave.Velocidad <= 1) { 
                clearInterval(disminuirVelocidad); 
                disminuirVelocidad = null;
            }else{
                if(ObjNave.Velocidad <= 2){
                    ObjNave.Velocidad -= 0.04;
                }else if(ObjNave.Velocidad <= 4){
                    ObjNave.Velocidad -= 0.07;
                }else if(ObjNave.Velocidad <= 6){
                    ObjNave.Velocidad -= 0.08;
                }else if(ObjNave.Velocidad <= 8){
                    ObjNave.Velocidad -= 0.09;
                }else if(ObjNave.Velocidad <= 10){
                    ObjNave.Velocidad -= 0.1;
                }
            }
        }, 10);
    }
});


let asteroide1X=0;
let asteroide1Y=asteroide1.getBoundingClientRect().y;
let direccionX=1;
let intervaloAsteroide1=setInterval(moverAsteroide1,10);

let asteroide2Y=0;
let asteroide2X=asteroide2.getBoundingClientRect().x;
let direccionY=1;

console.log(ObjNave.X);
console.log(ObjNave.Y);
console.log(asteroide1X);
console.log(asteroide1Y);

function moverAsteroide1(){
    asteroide1X +=5 * direccionX;
    asteroide1.style.marginLeft=asteroide1X+"px";

    if(asteroide1X + anchoAsteroide1> anchoPagina){
        asteroide1X=anchoPagina-anchoAsteroide1;
        direccionX=-1
    }else if(asteroide1X<0){
        asteroide1X=0;
        direccionX=1;
    }
}

function moverAsteroide2(){
    asteroide2Y +=5 * direccionY;
    asteroide2.style.marginTop=asteroide2Y+"px";

    if(asteroide2Y + altoAsteroide2> altoPagina -4){
        asteroide2Y= altoPagina-altoAsteroide2;
        direccionY=-1;
    }else if(asteroide2Y<0){
        asteroide2Y=0;
        direccionY=1;
    }

    //console.log("Vertical asteroide 2 = "+asteroide2Y);
}


    let asteroide1X3=0;
    let direccionX3=1;
    let asteroide2Y3=0;
    let direccionY3=1;

    let anchoPaginaA3 = window.innerWidth;
    let altoPaginaA3 = window.innerHeight -3;

    anchoAsteroide3=asteroide3.offsetWidth;
    altoAsteroide3=asteroide3.offsetWidth;

    asteroide1X3 = (anchoPaginaA3 - anchoAsteroide3) / 2; // Centrar horizontalmente
    asteroide2Y3 = (altoPaginaA3 - altoAsteroide3) / 2; // Centrar verticalmente

    asteroide3.style.marginLeft = asteroide1X3 + "px"; 
    asteroide3.style.marginTop = asteroide2Y3 + "px"; 

function moverAsteroide3(){
    asteroide1X3 +=5 * direccionX3;
    asteroide2Y3 +=5 * direccionY3;

    if(asteroide2Y3 + altoAsteroide3> altoPaginaA3){
        asteroide2Y3= altoPaginaA3-altoAsteroide3;
        direccionY3=-1;
    }

    if(asteroide1X3<0){
        asteroide1X3=0;
        direccionX3=1;
    }

    if(asteroide2Y3<0){
        asteroide2Y3=0;
        direccionY3=1;
    }

    if(asteroide1X3 + anchoAsteroide3> anchoPaginaA3){
        asterioide1X3=anchoPaginaA3-anchoAsteroide3;
        direccionX3=-1;
    }

    asteroide3.style.marginLeft = asteroide1X3 + "px"; 
    asteroide3.style.marginTop = asteroide2Y3 + "px";
}

function colisionAsteroide1() {

    // Obtener las posiciones y dimensiones de la nave y el asteroide
    const naveRect = nave.getBoundingClientRect();
    const asteroide1Rect = asteroide1.getBoundingClientRect();

    // Verificar si hay colisión
    if (
        naveRect.x < asteroide1Rect.x + anchoAsteroide1 &&
        naveRect.x + anchoNave > asteroide1Rect.x &&
        naveRect.y < asteroide1Rect.y + altoAsteroide1 &&
        naveRect.y + altoNave > asteroide1Rect.y
    ) {

        // Si hay colisión, cambiar la condición de explosión y las imágenes
        condicionExplosion = true;
        nave.src = 'explosion1.png'; // Cambiar la imagen de la nave a la explosión
        asteroide1.src = 'explosion3.png'; // Cambiar la imagen del asteroide a la explosión
        clearInterval(intervaloAsteroide1);
    }

}

// Iniciar el juego
document.addEventListener('DOMContentLoaded', function() {
    ObjNave.iniciarGravedad();
    ObjNave.mostrarDatos();
    ObjNave.moverNave();
  
    intervaloAsteroide1;
    setInterval(moverAsteroide2, 10);
    setInterval(moverAsteroide3, 10);
    setInterval(colisionAsteroide1, 10);
     
});