var nacimiento = prompt ("Que dia naciste");

var resto=nacimiento%2;
if (nacimiento <1 || 31< nacimiento){
    alert ("no es un dia valido");
}
else{
    if (resto==0){
        alert ("dia par");
    }
    else{
        alert ("dia impar");
    }
}