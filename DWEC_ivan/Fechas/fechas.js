function variables(){
    FechaActual = new Date();

    console.log(FechaActual.getFullYear());
    console.log(FechaActual.getMonth());
    console.log(FechaActual.getDate());
    console.log(FechaActual.getHours());
    console.log(FechaActual.getMinutes());
    console.log(FechaActual.getSeconds());
    console.log(FechaActual.getMilliseconds());
    console.log(FechaActual.getDay());

    fecha = new Date(document.getElementById("fecha").value);
    intervalo = FechaActual - fecha;
    Años01 = intervalo/1000/60/60/24/365.25;

    Años = Math.floor(Años01);
    Dias = Math.floor((Años01 - Años)*365.25);

    AñosFaltan = Math.floor(-Años01);
}

document.getElementById("boton1").addEventListener('click', ()=>{
    variables();

    if(fecha<FechaActual){
        document.getElementById("textoIntervalo").innerHTML="Han pasado: " + Años + " Años y " + Dias + " Dias";
    }else{
        document.getElementById("textoIntervalo").innerHTML="Faltan: " + AñosFaltan + " Años y " + Dias + " Dias";
    }
})

document.getElementById("boton2").addEventListener('click', ()=>{
    body = document.getElementById("body");
    switch(document.getElementById("desplegable").value){
        case "13820 A.C":
            body.style.backgroundImage = "url('trogloditas.png')";
            break;
        case "27 A.C":
            body.style.backgroundImage = "url('gladiador.png')";
            break;
        case "3029":
            body.style.backgroundImage = "url('futuro.png')";
            break;
        case "4028":
            body.style.backgroundImage = "url('explotar.png')";
            break;
    }
})