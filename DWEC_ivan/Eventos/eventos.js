Y1 = 270;
X1 = 690;
Y2 = 300;
X2 = 720;
uno = document.getElementById("uno");
dos = document.getElementById("dos");

function bot(){
    aleatorio = Math.floor(Math.random()*4);

    if(aleatorio == 0){
        Y2 -= 30;
        dos.style.marginTop = Y2 + "px";
    }else if(aleatorio == 1){
        Y2 += 30;
        dos.style.marginTop = Y2 + "px"; 
    }else if(aleatorio == 2){
        X2 -= 30;
        dos.style.marginLeft = X2 + "px"; 
    }else{
        X2 += 30;
        dos.style.marginLeft = X2 + "px"; 
    }
}

document.addEventListener('keydown', (evento)=>{
    switch(evento.key){
        case "w": 
            Y1 -= 30;
            uno.style.marginTop = Y1 + "px"; 
            bot();
            break;
        case "s": 
            Y1 += 30;
            uno.style.marginTop = Y1 + "px"; 
            bot();
            break;
        case "a": 
            X1 -= 30;
            uno.style.marginLeft = X1 + "px"; 
            bot();
            break;
        case "d": 
            X1 += 30;
            uno.style.marginLeft = X1 + "px"; 
            bot();
            break;
    }
});