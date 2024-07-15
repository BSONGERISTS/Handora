document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
});

var header = document.getElementById("butts");
// 
var btns = header.getElementsByClassName("btn-style");
// 
for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        } 
    );
}

function guide(){
    var element = document.getElementById("1s");
    element.classList.add("position")

    var element2 = document.getElementById("2s");
    element2.classList.remove("position")
}

function diss(){
    var element3 = document.getElementById("1s");
    element3.classList.remove("position")

    var element4 = document.getElementById("2s");
    element4.classList.add("position")
}

function PopOpen(){
    var PopElementOpen = document.getElementById("pop");
    PopElementOpen.classList.remove("pop-index")
}

function PopClose(){
    var PopElementClose = document.getElementById("pop");
    PopElementClose.classList.add("pop-index")
}

function Prof1(){
    var Prof1 = document.getElementById("user-prof");
    Prof1.src = "./Assets/MCLogo.svg";
}