var frases = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

function cambiar(){
    var cambiar = document.getElementById('texto');
    aleatorio = Math.floor(Math.random()*7)
    cambiar.innerHTML = frases[aleatorio];
}