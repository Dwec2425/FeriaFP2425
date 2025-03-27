var componentes = ["Procesador", "Ram", "Disco", "Grafica", "Caja", "Placa Base"];

function imprimir(){
    var imprimir = document.getElementById('imprimir');
    imprimir.innerHTML = componentes.join(" - ");
    
}

function longitud(){
    var longitud = document.getElementById('imprimir');
    var index = longitud.innerHTML.indexOf("<br>");
    
    if (index !== -1) {
        //no hace nada
    }else{
        longitud.innerHTML += "<br>" + componentes.length + " Datos Almacenados";
    }
}

function añadir() {
    var texto = document.getElementById('texto').value;
    if(texto == ""){
        alert("Escribe");
    }else{
        componentes.push(texto);
        imprimir();
    }
}

function quitar(){
    componentes.pop();
    imprimir();
}

function añadirPrincipio(){
    var texto = document.getElementById('texto').value;
    if(texto == ""){
        alert("Escribe");
    }else{
        componentes.unshift(texto);
        imprimir();
    }
}

function quitarPrincipio(){
    componentes.shift();
    imprimir();
}

function ordenar(){
    componentes.sort();
    imprimir();
}