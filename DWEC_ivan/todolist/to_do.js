entradaTarea = document.getElementById("nueva-tarea");
botonAgregar = document.getElementById("btn-agregar");
listaTareasIncompletas = document.getElementById("lista-tareas-incompletas");
listaTareasCompletadas = document.getElementById("lista-tareas-completadas");

//botón agregar
botonAgregar.addEventListener("click", function () {
  tarea = entradaTarea.value.trim();
  if (tarea === "") {
    alert("Por favor, ingrese una tarea");
    return;
  }

  tareas.push({ 
    valor: tarea,
    estaCompleta: false
  });

  entradaTarea.value = "";
  iniciar();
});

tareas = [];

//inicia el programa
function iniciar() {
  listaTareasIncompletas.innerHTML = "";
  listaTareasCompletadas.innerHTML = "";
  
  tareas.forEach((tarea, indice) => {
    elementoLista = document.createElement("li");
    elementoLista.textContent = tarea.valor;

    if (tarea.estaCompleta) {
      elementoLista.classList.add("completada");

      botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";

      //botón eliminar
      botonEliminar.onclick = function () {
        tareas.splice(indice, 1);
        guardarTareas();
        iniciar();
      };

      elementoLista.appendChild(botonEliminar);
      listaTareasCompletadas.appendChild(elementoLista);
    } else {
      botonCompletar = document.createElement("button");
      botonCompletar.textContent = "Completar";

      //botón completar
      botonCompletar.onclick = function () {
        tareas[indice].estaCompleta = true;
        iniciar();
      };

      elementoLista.appendChild(botonCompletar);
      listaTareasIncompletas.appendChild(elementoLista);
    }
  });
  guardarTareas();
}

//guarda las tareas de localStorage
function guardarTareas() {
  localStorage.clear();
  tareas.forEach((tarea, indice) => {
    localStorage.setItem(`${indice}`, `${tarea.valor}|${tarea.estaCompleta}`);
  });
}

//carga las tareas de localStorage
function cargarTareas() {
  tareas = [];
  for (let indice = 0; indice < localStorage.length; indice++) {
    const key = localStorage.key(indice);
    const [valor, estaCompleta] = localStorage.getItem(key).split('|');
    tareas.push({ valor, estaCompleta: estaCompleta === 'true' });
  }
}

//empieza el programa
cargarTareas();
iniciar();