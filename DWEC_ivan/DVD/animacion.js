//funciones
x = 0;
y = 0;
condicionX = true;
condicionY = true;
ventanaX = window.innerWidth-50;
ventanaY = window.innerHeight-50;
cuadrado = document.getElementById("cuadrado");
tamaño = 0;
let intervalos = [];

window.addEventListener("resize", () => {
    //para que se ajuste al tamaño de la pagina
    ventanaX = window.innerWidth-50;
    ventanaY = window.innerHeight-50;
    if(x > ventanaX){ 
        x = ventanaX; 
        cuadrado.style.marginLeft = x + "px";
    }
    if(y > ventanaY){ 
        y = ventanaY; 
        cuadrado.style.marginTop = y + "px";
    }
});

document.getElementById("Acelerar").addEventListener("click", ()=>{
    intervalo = setInterval(()=>{
        if(tamaño > 5000){
            document.getElementById("Reiniciar").style.borderColor = "#00FF00";
            document.getElementById("Reiniciar").style.color = "#00FF00";
        }
        //eje X
        if(condicionX == true){
            if (ventanaX >= x){
                x += 1;
                cuadrado.style.marginLeft = x + "px";
            }else{
                condicionX = false;
                cuadrado.style.backgroundColor = "blue"
                ventanaX -= 2;
                ventanaY -= 2;
                tamaño += 1;
                cuadrado.style.padding = tamaño + "px";
            }
        }
        if (condicionX == false){
            if(x <= 0){
                condicionX = true;
                cuadrado.style.backgroundColor = "red"
                ventanaX -= 2;
                ventanaY -= 2;
                tamaño += 1;
                cuadrado.style.padding = tamaño + "px";
            }else{
                x -= 1;
                cuadrado.style.marginLeft = x + "px";
            }
        }
        //eje Y
        if(condicionY == true){
            if (ventanaY >= y){
                y += 1;
                cuadrado.style.marginTop = y + "px";
            }else{
                condicionY = false;
                cuadrado.style.backgroundColor = "green"
                ventanaX -= 2;
                ventanaY -= 2;
                tamaño += 1;
                cuadrado.style.padding = tamaño + "px";
            }
        }
        if (condicionY == false){
            if(y <= 0){
                condicionY = true;
                cuadrado.style.backgroundColor = "yellow"
                ventanaX -= 2;
                ventanaY -= 2;
                tamaño += 1;
                cuadrado.style.padding = tamaño + "px";
            }else{
                y -= 1;
                cuadrado.style.marginTop = y + "px";
            }
        }
        intervalos.push(intervalo);
    }, 5);
});

document.getElementById("Parar").addEventListener("click", ()=>{
    intervalos.forEach(
        intervalo => clearInterval(intervalo)
    );
    intervalos = [];
});

document.getElementById("Reiniciar").addEventListener("click", ()=>{
    if(tamaño > 5000){
        location.reload()
    }
});