class carta {
    constructor(icono) {
        this.texto = icono;
        this.html = document.createElement("div");
        this.html.classList.add("carta");
        this.html.textContent = this.texto;
        this.id = null;
        this.idPareja = null;
    }
    setId(num) {
        this.id = num;
        this.html.id = `carta${num}`;
    }
    setIdPareja(num) {
        this.idPareja = num;
    }
}

