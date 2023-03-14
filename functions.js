/*----------Desplegable----------*/

var opTit = document.getElementsByClassName("contTitDat");
var i;

for (i = 0; i < opTit.length; i++) {
    opTit[i].addEventListener("click", );
}

function desplegar(){
    this.classList.toggle("desplegado");
    visible();
    
}


function() {

    var actual = this.nextElementSibling;
    if (actual.style.display === "block") {
        actual.style.display = "none";
    } else {
        actual.style.display = "block";
    }
}