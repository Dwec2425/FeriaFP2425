addEventListener("click", (evento)=>{
    X = evento.clientX;
    Y = evento.clientY;
    objeto.teletranporte(X,Y);
})

objeto = {
    uno: document.getElementById("uno"),
    
    teletranporte(X, Y){
        this.uno.style.marginLeft = X + "px";
        this.uno.style.marginTop = Y + "px";
    }
}