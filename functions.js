/*----------Desplegable----------*/

var opTit = document.getElementsByClassName("contTitDat");
var i;

for (i = 0; i < opTit.length; i++) {
    opTit[i].addEventListener("click", function() {
        this.classList.toggle("desplegado");
        var actual = this.nextElementSibling;
        if (actual.style.display === "block") {
            actual.style.display = "none";
        } else {
            actual.style.display = "block";
        }
    });
}