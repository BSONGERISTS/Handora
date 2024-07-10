// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
});


// NavBar \\
var header = document.getElementById("header-buttons");
// 
var btns = header.getElementsByClassName("Nav-Style");
// 
for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        } 
    );
}

// Home \\


var TopHome = document.getElementById("home-container");
var Hgame = TopHome.getElementsByClassName("game-size");

var TopBG = document.getElementById("home-container"); // Define TopBG if not already defined
var BGimage = TopBG.getElementsByClassName("bg-size");

for (var i = 0; i < Hgame.length ; i++) {
    (function(index) { // Create a closure to preserve the value of 'i'
        Hgame[index].addEventListener("click", function() {
            // Remove 'active-game' class from the current active element
            var gamecurrent = document.getElementsByClassName("active-game");
            if (gamecurrent.length > 0) {
                gamecurrent[0].className = gamecurrent[0].className.replace(" active-game", "");
            }
            // Add 'active-game' class to the clicked element
            this.className += " active-game";

            // Update the background image
            var currentBG = document.getElementsByClassName("bg-opacity");
            if (currentBG.length > 0) {
                currentBG[0].className = currentBG[0].className.replace(" bg-opacity", "");
            }
            BGimage[index].className += " bg-opacity";
        });
    })(i);
}

