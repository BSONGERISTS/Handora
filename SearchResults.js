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

