function OVER(){
    var image = document.getElementById('IDimage');
    if (image.src.match("dia")){
        image.src = "noche.jpg";
    } else{
        image.src = "dia.jpg";
    }
}
function LEAVE(){
    var image = document.getElementById('IDimage');
    if (image.src.match("dia")){
        image.src = "noche.jpg";
    } else{
        image.src = "dia.jpg";
    }
}

function SMALL(){
    var image = document.getElementById('IDimage'), 
    w=image.clientWidth, h=image.clientHeight;
    image.style.width = (w * 0.98) + "px";
    image.style.height = (h * 0.98) + "px";
}