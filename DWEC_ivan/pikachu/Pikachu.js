pikachu = {
    color: "amarillo",
    ataque(){
        alert("Cola Ferrea");
    },
    soy(){
        alert(pikachu.color);
    }
}

document.getElementById("Ataque").addEventListener("click", ()=>{
    pikachu.ataque();
});

document.getElementById("Color").addEventListener("click", ()=>{
    pikachu.soy();
});

document.getElementById("Shiny").addEventListener("click", ()=>{
    if(pikachu.color == "amarillo"){
        pikachu.color = "naranja";
    }else{
        pikachu.color = "amarillo";
    }
});