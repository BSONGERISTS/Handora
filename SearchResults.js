document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready');
});


// Get the head element and all elements with the class 'popup'
var head = document.getElementById("head");
var btns = head.getElementsByClassName("popup");

// Add event listeners to all popup buttons
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", togglePopup);
}

// Function to toggle the pop-up visibility
function togglePopup() {
    var pop = document.getElementById("pop");
    pop.classList.toggle("login-index");
}

// Search nav \\
var header = document.getElementById("snav");
// 
var btns = header.getElementsByClassName("search-btn");
// 
for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("sbtn-active");
            current[0].className = current[0].className.replace(" sbtn-active", "");
            this.className += " sbtn-active";
        } 
    );
}

// Dropdown \\
var drop = document.getElementById("drop");
// 
var dropbtn = drop.getElementsByClassName("drop-btn");
// 
for (var i = 0; i < dropbtn.length; i++) {
        dropbtn[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("drop-active");
            current[0].className = current[0].className.replace(" drop-active", "");
            this.className += " drop-active";
        } 
    );
}