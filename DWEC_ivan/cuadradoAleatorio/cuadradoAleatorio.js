const padre = document.getElementById("padre")
const hijo1 = document.createElement("div");
hijo1.className = "hijo1";
hijo1.id = "hijo1";
padre.appendChild(hijo1);
padreX = padre.offsetWidth;
padreY = padre.offsetHeight;

function cambiarHijo1(){
    aleatorioX = Math.floor(Math.random()*padreX);
    aleatorioY = Math.floor(Math.random()*padreY);
    hijo1.style.marginLeft = aleatorioX + "px";
    hijo1.style.marginTop = aleatorioY + "px";
    
    colorAleatorio1 = Math.floor(Math.random()*256);
    colorAleatorio2 = Math.floor(Math.random()*256);
    colorAleatorio3 = Math.floor(Math.random()*256);
    hijo1.style.backgroundColor = "rgb(" + colorAleatorio1 + ", " + colorAleatorio2 + ", " + colorAleatorio3 + ")";
}

cambiarHijo1();
document.getElementById("boton").addEventListener("click", cambiarHijo1);