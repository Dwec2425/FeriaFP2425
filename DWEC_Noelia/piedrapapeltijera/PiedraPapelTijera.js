/*He creado un array que contiene los 3 posibles resultados de la máquina
- 0= va a ser igual a piedra2 del html, que corresponde con el src= Piedra2.jpg
- 1= va a ser igual a papel2 del html, que corresponde con el src= Papel2.jpg 
- 2= va a ser igual a tijera2 del html, que corresponde con el src= Tijera2.jpg*/ 
let ArrayMaquina=[
    'piedra2',
    'papel2',
    'tijera2'
]    

let contadorPer=10; // para ir contando las veces que gana la persona
let contadorMaq=10; // para ir contando las veces que gana la máquina

let puntosPer=0; // para ir sumando los puntos de la persona
let puntosMaq=0; // para ir sumando los puntos de la máquina

let contadorPuntosPerx2=0; // para ir contando si la persona gana 2 veces seguidas
let contadorPuntosMaqx2=0; // para ir contando si la máquina gana 2 veces seguidas

/*Esta es la función que se ejecuta cuando la persona pincha en el imágen de la piedra*/
function piedraPer(){

    /*Aquí lo que hago es crear una variable para guardar un número que voy a generar de manera aleatoria con la llamada al 
    método math.random, teniendo como máximo de valores los del arrayMaquina y utilizando math.floor para que el número que
    obtenga sea un entero y no un decimal*/
    ArrayMaquinaAleatorio=Math.floor(Math.random()*(ArrayMaquina.length));

    /*Teniendo en cuenta que el jugador selecciona la piedra, y que para el arrayMaquina, he generado un número aleatorio
    el cual va a corresponder a uno de dus valores, he creado una serie de comparaciones que son las condiciones 
    de los if para poder determinar que es lo que tiene que aparecer en el contenedor de resultados*/   

    /*Aquí hago un if para que si el número aleatorio que se ha generado anteriormente es = 0, tiene que volcarse en el html, 
    en el contenedor de resultados:
    - En el resultado máquina la imágen de la Piedra de la máquina
    - En el resultado la palabra empate de color negro
    - Y en el resultado persona la imágen de la piedra que ha seleccionado el jugador*/
    if(ArrayMaquinaAleatorio==0){
        document.getElementById('resultadoMaq').innerHTML='<img src="Piedra2.jpg">';
        document.getElementById('resultado').innerHTML="EMPATE";
        document.getElementById('resultado').style.color='black';
        document.getElementById('resultadoPer').innerHTML='<img src="Piedra1.jpg">';
        contadorPuntosMaqx2=0;
        contadorPuntosPerx2=0;
        /*Aquí hago un if para que si el número aleatorio es igual a 1, tiene que volcarse al html, en el contenedor de resultados:
    - En el resultado máquina la imágen del papel de la máquina
    - En el resultado la palabra pierdes en rojo (El papel de la máquina gana a la piedra del jugador)
    - En el resultado persona la imágen de la piedra que ha seleccionado el jugador*/
    }else if(ArrayMaquinaAleatorio==1){
        document.getElementById('resultadoMaq').innerHTML='<img src="Papel2.jpg">';
        document.getElementById('resultado').innerHTML="PIERDES";
        document.getElementById('resultado').style.color='red';
        document.getElementById('resultadoPer').innerHTML='<img src="Piedra1.jpg">';
        // Llamo a la función contadorMaqX2() desglosaga abajo del todo
        contadorMaqX2();
    /*El else es para la última opción que se nos puede presentar que sería la el caso en el que el número aleatorio de la máquina
    fuese igual a 2, en este caso se volcaría al html, en el contenedor de resultados:
    - En el resultado máquina la imágen de las tijeras de la máquina
    - En el resultado la palabra ganas en verde (La piedra del jugador ganan a las tijeras de la máquina)
    - En el resultado persona la imágen de la piedra que ha seleccionado el jugador*/         
    }else{
        document.getElementById('resultadoMaq').innerHTML='<img src="Tijeras222.jpg">';
        document.getElementById('resultado').innerHTML="GANAS";
        document.getElementById('resultado').style.color='green';
        document.getElementById('resultadoPer').innerHTML='<img src="Piedra1.jpg">';
        // Llamo a la función contadorPerX2() desglosaga abajo del todo
        contadorPerX2();                 
    }  
    //Aquí hago la llamada a estas funciones que están desglosadas más abajo
    resultVidas();
    resultColorPuntos();
    finalJuego();
}

/*Esta función sigue exactamente la misma lógica que la anterior, la única diferencia son las imágenes y las frases que se van a ir 
volcando dentro de los div del html, puesto que aquí tengo en cuenta que la imágen seleccionada por el jugador es el papel y en 
base a eso voy haciendo las diferentes comparativas */
function papelPer(){

    ArrayMaquinaAleatorio=Math.floor(Math.random()*(ArrayMaquina.length));

    if(ArrayMaquinaAleatorio==1){
        document.getElementById('resultadoMaq').innerHTML='<img src="Papel2.jpg">';
        document.getElementById('resultado').innerHTML="EMPATE";
        document.getElementById('resultado').style.color='black';
        document.getElementById('resultadoPer').innerHTML='<img src="Papel1.jpg">';
        contadorPuntosMaqx2=0;
        contadorPuntosPerx2=0;
    }else if(ArrayMaquinaAleatorio==0){
        document.getElementById('resultadoMaq').innerHTML='<img src="Piedra2.jpg">';
        document.getElementById('resultado').innerHTML="GANAS";
        document.getElementById('resultado').style.color='green';
        document.getElementById('resultadoPer').innerHTML='<img src="Papel1.jpg">';
        contadorPerX2();
    }else{
        document.getElementById('resultadoMaq').innerHTML='<img src="Tijeras222.jpg">';
        document.getElementById('resultado').innerHTML="PIERDES";
        document.getElementById('resultado').style.color='red';
        document.getElementById('resultadoPer').innerHTML='<img src="Papel1.jpg">';
        contadorMaqX2();
    }
    
    resultVidas();
    resultColorPuntos();
    finalJuego();
}

/*Esta función sigue exactamente la misma lógica que las dos anteriores, la única diferencia son las imágenes y las frases que se van a ir 
volcando dentro de los div del html, puesto que aquí tengo en cuenta que la imágen seleccionada por el jugador es el papel y en 
base a eso voy haciendo las diferentes comparativas */
function tijeraPer(){

    ArrayMaquinaAleatorio=Math.floor(Math.random()*(ArrayMaquina.length));

    if(ArrayMaquinaAleatorio==2){
        document.getElementById('resultadoMaq').innerHTML='<img src="Tijeras222.jpg">';
        document.getElementById('resultado').innerHTML="EMPATE";
        document.getElementById('resultado').style.color='black';
        document.getElementById('resultadoPer').innerHTML='<img src="Tijera1.jpg">';
        contadorPuntosMaqx2=0;
        contadorPuntosPerx2=0;
    }else if(ArrayMaquinaAleatorio==1){
        document.getElementById('resultadoMaq').innerHTML='<img src="Papel2.jpg">';
        document.getElementById('resultado').innerHTML="GANAS";
        document.getElementById('resultado').style.color='green';
        document.getElementById('resultadoPer').innerHTML='<img src="Tijera1.jpg">';
        contadorPerX2();
    }else{
        document.getElementById('resultadoMaq').innerHTML='<img src="Piedra2.jpg">';
        document.getElementById('resultado').innerHTML="PIERDES";
        document.getElementById('resultado').style.color='red';
        document.getElementById('resultadoPer').innerHTML='<img src="Tijera1.jpg">';
        contadorMaqX2();
    }

    resultVidas();
    resultColorPuntos();
    finalJuego();
}


/*Las 3 funciones que aparecen a continuación son las funciones que llamo desde las anteriores*/

/*Aquí he creado la función resultVidas para que sea cual sea la función que se esté ejecutando, en el html, result-vidasPer, se vaya
volcando en todo momento el resltado de las vidas que tienen el jugador y la máquina, lo que se ve reflejado en la cantidad de corazones.*/
function resultVidas(){
    if(contadorPer>=10){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPerMaq10.jpg">';
    }else if(contadorPer==9){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer9.jpg">';
    }else if(contadorPer==8){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer8.jpg">';
    }else if(contadorPer==7){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer7.jpg">';
    }else if(contadorPer==6){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer6.jpg">';
    }else if(contadorPer==5){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer5.jpg">';
    }else if(contadorPer==4){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer4.jpg">';
    }else if(contadorPer==3){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer3.jpg">';
    }else if(contadorPer==2){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer2.jpg">';
    }else if(contadorPer==1){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPer1.jpg">';
    }else if(contadorPer==0){
        document.getElementById('result-vidasPer').innerHTML='<img src="vidasPerMaq0.jpg">';
    }
    if(contadorMaq>=10){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasPerMaq10.jpg">';
    }else if(contadorMaq==9){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq9.jpg">';
    }else if(contadorMaq==8){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq8.jpg">';
    }else if(contadorMaq==7){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq7.jpg">';
    }else if(contadorMaq==6){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq6.jpg">';
    }else if(contadorMaq==5){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq5.jpg">';
    }else if(contadorMaq==4){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq4.jpg">';
    }else if(contadorMaq==3){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq3.jpg">';
    }else if(contadorMaq==2){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq2.jpg">';
    }else if(contadorMaq==1){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasMaq1.jpg">';
    }else if(contadorMaq==0){
        document.getElementById('result-vidasMaq').innerHTML='<img src="vidasPerMaq0.jpg">';
    }

    /*Aquí he llamado a estas dosfunciones que están desglosadas más abajo*/
    tamañoCorazonesMaq();
    tamañoCorazonesPer();
}

/*Aquí he creado la función finalJuego para que cuando el contador de las vidas del jugador o la maquina lleguen a 0, o los puntos del
jugador o la máquina lleguen a 1000 aparezca el div que cree en primera posición en el html y que tengo oculto con css durante todas 
las rondas, con la palabra con el resultado y el botón que recargará la página.
- Si gana la máquina, tengo el bacgroundColor predefinido en rojo en el css, por lo que aparecera el div en rojo con la frase "HAS PERDIDO",
junto con el botón de recargar la página
- Si gana la persona, como tengo el bacgroundColor predefinido en rojo en el css, lo cambio a verde y aparecera el div en verde con la frase 
"HAS GANADO",junto con el botón de recargar la página*/
function finalJuego(){
    if(contadorPer==0){
        document.getElementById('finalJuego').style.display='flex';
        document.getElementById('textoFinal').innerHTML="HAS PERDIDO";                        
    }else if(contadorMaq==0){
        document.getElementById('finalJuego').style.display='flex';
        document.getElementById('finalJuego').style.backgroundColor='rgba(0, 255, 0, 1)';
        document.getElementById('textoFinal').innerHTML="HAS GANADO";
    }else if(puntosMaq>=3000){
        document.getElementById('finalJuego').style.display='flex';
        document.getElementById('textoFinal').innerHTML="HAS PERDIDO <br>";
    }else if(puntosPer>=3000){
        document.getElementById('finalJuego').style.display='flex';
        document.getElementById('finalJuego').style.backgroundColor='rgba(0, 255, 0, 1)';
        document.getElementById('textoFinal').innerHTML="HAS GANADO <br>";
    } 
}

/*Esta función la he creado para que sea cual sea la función que se está ejecutando, en todo momento aparezcan en result-puntosMaq y 
result-puntosPer del html, el resultado de la puntuación que llevan el jugador y la máquina, además de eso he creado una serie de condiciones
en las cuales:
- Si los puntos del jugador son mayores que los de la máquina, los del jugador aparecen en verde y los de la máquina en rojo
- Si los puntos de la máquina son mayores que los del jugador, los de la máquina aparecen en verde y los del jugador en rojo
- Y si ambos tienen la misma puntuación, salen ambas en color negro*/
function resultColorPuntos(){
    document.getElementById('result-puntosMaq').innerHTML=puntosMaq+" PUNTOS";
    document.getElementById('result-puntosPer').innerHTML=puntosPer+" PUNTOS";
    if(puntosPer>puntosMaq){
        document.getElementById('result-puntosMaq').style.color='red';
        document.getElementById('result-puntosPer').style.color='green';                        
    }else if(puntosMaq>puntosPer){
        document.getElementById('result-puntosPer').style.color='red';
        document.getElementById('result-puntosMaq').style.color='green';
    }else if(puntosPer==puntosMaq){
        document.getElementById('result-puntosPer').style.color='black';
        document.getElementById('result-puntosMaq').style.color='black';
    }
}

/*Aquí he creado la función para el botón que aparece en el div del finalJuego, que lo que hace es recargar la página*/
function recargarPagina(){
    location.reload();
}

/*Esta función la he creado estas dos para que las imágenes que se van volcando en el div result-vidasPer, se vuelquen con un tamaño de 
330px de ancho y un alto automático*/
function tamañoCorazonesPer(){
    document.getElementById('result-vidasPer').style.width='330px';
    document.getElementById('result-vidasPer').style.height='35px';
}

function tamañoCorazonesMaq(){
    document.getElementById('result-vidasMaq').style.width='330px';
    document.getElementById('result-vidasMaq').style.height='35px';
}

/*Aquí he creado 1 funcion para que cuando la máquina gana la ronda:
- Al contador de corazones del jugador se le resta 1, así por cada vez que pierde dentro de esta funcón pierde una vida.
- Se suman 100 puntos al contador de puntos de la máquina
- Al contador de rondas ganadas por la máquina se le suma 1
- El contador de rondas ganadas por el jugador se iguala a 0
- Si el contador de rondas ganadas por la máquina es =2, se multiplican x2 los puntos de la máquina y el contador vuelve a 0 y aparece
en la pantalla un mensaje que indica que se te han multiplicado los puntosx2, el cual desaparece tras un segundo
 */
function contadorMaqX2(){
    contadorPer--;
    puntosMaq+=100;
    contadorPuntosMaqx2++;
    contadorPuntosPerx2=0;
        if(contadorPuntosMaqx2==2){
            document.getElementById('puntosx2maq').style.display = 'inline';
            puntosMaq*=2;
            contadorPuntosMaqx2=0;
            /*Intenté implementar esto con un if else pero es que tardaba mucho en desaparecer, asíque se me ocurrió hacerlo como la función 
            que implementé al principio pero que, como aún no lo habíamos visto lo cambié, en este caso lo dejo porque quiero que sea algo que
            aparece poco tiempo y es la única forma que he encontrado de implementarlo */
            setTimeout(function() {
                document.getElementById('puntosx2maq').style.display = 'none';
            }, 1200);
        } 
}

/*Esta función es igual que la anterior pero para restar vidas a la máquina y sumar puntos al jugador*/
function contadorPerX2(){
    contadorMaq--;
    puntosPer+=100;
    contadorPuntosPerx2++;
    contadorPuntosMaqx2=0;
        if(contadorPuntosPerx2==2){
        document.getElementById('puntosx2per').style.display = 'inline';
        puntosPer*=2;
        contadorPuntosPerx2=0;
        setTimeout(function() {
            document.getElementById('puntosx2per').style.display = 'none';
        }, 1200);
        }
}