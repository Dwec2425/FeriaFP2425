function bots(){
    bot1 = Math.floor(Math.random()*12+1);
    bot2 = Math.floor(Math.random()*12+1);
}

function generar(){
    bots();
    num1 = document.getElementById("num1");
    num1.innerHTML = bot1;
    num2 = document.getElementById("num2");
    num2.innerHTML = bot2;

    salida = document.getElementById("salida");
    if(bot1>bot2){
        salida.innerHTML = "ganas";
    }
    else if(bot1<bot2){
        salida.innerHTML = "pierdes";
    }
    else{
        salida.innerHTML = "empate";
    }
}