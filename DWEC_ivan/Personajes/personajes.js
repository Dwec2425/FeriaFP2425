class personajes{
    static heroes = [];
    static villanos = [];
    constructor(nombre) {
        this.nombre = nombre;
        console.log("Se ha creado a " + this.nombre);
    }
}

class heroe extends personajes{
    constructor(nombre, fase = 2) {
        super(nombre);
        this.fase = fase;
        if(this.fase == 1){
            console.log("Fase de " + this.nombre + ": pequeño");
        }else if(this.fase == 2){
            console.log("Fase de " + this.nombre + ": grande");
        }else if(this.fase == 3){
            console.log("Fase de " + this.nombre + ": flor");
        }else{
            console.log("Fase de " + this.nombre + ": muerto");
        }
        personajes.heroes.push(this);
    }
    
    subirFase(){
        if(this.fase <= 3 && this.fase >= 1){
            this.fase += 1;
            if(this.fase == 1){
                console.log(this.nombre + " se ha vuelto pequeño");
            }else if(this.fase == 2){
                console.log(this.nombre + " se ha vuelto grande");
            }else if(this.fase == 3){
                console.log(this.nombre + " ha conseguido una flor");
            }else{
                console.log("error");
            }
        }
    }

    saltar(altura){
        console.log(this.nombre + " ha saltado " + altura + " metros");
    }
}

class villano extends personajes{
    constructor(nombre, vida){
        super(nombre, vida);
        this.vida = vida;
        personajes.villanos.push(this);
    }

    atacar(heroe){
        if(heroe.fase >= 1){
            heroe.fase -= 1;
            console.log(this.nombre + " ha atacado a " + heroe.nombre);
            if(heroe.fase == 1){
                console.log(heroe.nombre + " se ha vuelto pequeño");
            }else if(heroe.fase == 0){
                console.log(heroe.nombre + " ha muerto");
                heroe = null;
            }
        }
    }

    clonar(veces) {
        for(let i = 0; i < veces; i++){
            new villano("clon " + this.nombre, this.vida);
        }
    }
}    

function mostrarTodo(){
    info = "Heroes:\n";
    personajes.heroes.forEach(heroe => {
        info += heroe.nombre + ", estado actual: ";
        if(heroe.fase == 1){
            info += "pequeño \n";
        }else if(heroe.fase == 2){
            info += "grande \n";
        }else if(heroe.fase == 3){
            info += "flor \n";
        }else{
            info += "muerto \n";
        }
    });
    info += "\nVillanos:\n";
    personajes.villanos.forEach(villano => {
        info += villano.nombre + ", vida actual: " + villano.vida + "\n";
    });

    alert(info);
}

mario = new heroe("mario");
luigi = new heroe("luigi");
koopa = new villano("koopa", 2);
bowser = new villano("bowser", 10);

bowser.atacar(mario);
koopa.clonar(3);

mostrarTodo();