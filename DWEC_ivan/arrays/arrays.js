function imprimir(){
    console.log (frutas);
    console.log (frutas.length);
}

let frutas = ["manzana", "pera", "platano"];
imprimir();

frutas.push ('uva');
imprimir();

frutas.push ('melocoton', "coco");
imprimir();

frutas.pop ();
imprimir();

frutas.shift ();
imprimir();

frutas.unshift('ciruela');
imprimir();

frutas.sort();
imprimir();