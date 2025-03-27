function funcion1() {
    var lunes = document.getElementById('lunes');
    lunes.innerHTML = "Mercurio";
    lunes.style.color="#D0AA86";

    var martes = document.getElementById('martes');
    martes.innerHTML = "Venus";
    martes.style.color="#D8D09B";

    var miercoles = document.getElementById('miercoles');
    miercoles.innerHTML = "Tierra";
    miercoles.style.color="#35D4FB";

    var jueves = document.getElementById('jueves');
    jueves.innerHTML = "Marte";
    jueves.style.color="#FB3535";

    var viernes = document.getElementById('viernes');
    viernes.innerHTML = "Jupiter";
    viernes.style.color="#FFB64F";

    var sabado = document.getElementById('sabado');
    sabado.innerHTML = "Saturno";
    sabado.style.color="#FFD04F";

    var domingo = document.getElementById('domingo');
    domingo.innerHTML = "Urano";
    domingo.style.color="#9DE2E3";
    
    var imagenes = document.querySelectorAll('img');
        imagenes.forEach(function(img) {
        img.style.display = "block";
    });
}

function funcion2(){
    location.reload();
}