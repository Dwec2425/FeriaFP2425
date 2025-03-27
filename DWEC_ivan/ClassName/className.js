body = document.body;
padre = document.getElementById("padre");

hijo1 = document.createElement("div");
hijo1.className = "hijo fondoAzul";
hijo2 = document.createElement("div");
hijo2.className = "hijo fondoRojo";
alternar = document.createElement("button");
alternar.innerHTML = "Alternar";
alternar.className = "boton";

padre.appendChild(hijo1);
padre.appendChild(hijo2);
padre.appendChild(alternar);

hijo1.classList.add("borde25");
hijo2.classList.add("dash");

alternar.addEventListener('click', () => {
    //body.classList.remove("degradado");
    body.classList.toggle("degradado");
});

console.log(screen.width)
console.log(screen.height)