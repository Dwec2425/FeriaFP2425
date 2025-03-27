function numeros(){
    op1 = Number(document.getElementById("op1").value);
    op2 = Number(document.getElementById("op2").value);
}

document.getElementById("sumar").addEventListener("click", ()=>{
    numeros();
    resultado = op1 + op2;
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("general").style.borderColor = "green";
});

document.getElementById("restar").addEventListener("click", ()=>{
    numeros();
    resultado = op1 - op2;
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("general").style.borderColor = "red";
});

document.getElementById("multiplicar").addEventListener("click", ()=>{
    numeros();
    resultado = op1 * op2;
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("general").style.borderColor = "orange";
});

document.getElementById("dividir").addEventListener("click", ()=>{
    numeros();
    resultado = op1 / op2;
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("general").style.borderColor = "blue";
});