const padre = document.getElementById("padre")
const padreX = padre.offsetWidth - 31;
const padreY = padre.offsetHeight - 31;

let intervalo;

function crearPosicion(hijo){
    aleatorioX = Math.floor(Math.random()*padreX);
    aleatorioY = Math.floor(Math.random()*padreY);
    hijo.style.marginLeft = aleatorioX + "px";
    hijo.style.marginTop = aleatorioY + "px";
    
    colorAleatorio1 = Math.floor(Math.random()*256);
    colorAleatorio2 = Math.floor(Math.random()*256);
    colorAleatorio3 = Math.floor(Math.random()*256);
    hijo.style.backgroundColor = "rgb(" + colorAleatorio1 + ", " + colorAleatorio2 + ", " + colorAleatorio3 + ")";
}

function crearHijos(numero){
    for(let i = 0; i < numero; i++){
        let hijo = document.createElement("div");
        hijo.className = "hijo";
        hijo.id = "hijo" + i;
        padre.appendChild(hijo);
        crearPosicion(hijo);

        hijo.addEventListener('click', function() {
            padre.removeChild(hijo);
        });

        if(!intervalo){
            intervalo = setInterval(() => {
                let hijos = padre.getElementsByClassName("hijo");
                for (let j = 0; j < hijos.length; j++) {
                    let aleatorioX = parseInt(hijos[j].style.marginLeft) || 0;
                    let aleatorioY = parseInt(hijos[j].style.marginTop) || 0;

                    if(aleatorioX < padreX){
                        aleatorioX += 1;
                        hijos[j].style.marginLeft = aleatorioX + "px";
                    }else{
                        aleatorioX = 0;
                        hijos[j].style.marginLeft = aleatorioX + "px";
                    }
                    if(aleatorioY < padreY){
                        aleatorioY += 1;
                        hijos[j].style.marginTop = aleatorioY + "px";
                    }else{
                        aleatorioY = 0;
                        hijos[j].style.marginTop = aleatorioY + "px";
                    }
                }
            }, 10);
        }
    }
}

crearHijos(50);

