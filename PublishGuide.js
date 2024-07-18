document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready');
});

var GuideBtn = document.getElementById("guide-nav-btn");
// 
var GDBtn = GuideBtn.getElementsByClassName("guide-nav-style");
// 
for (var i = 0; i < GDBtn.length; i++) {
        GDBtn[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("gnstyle-active");
            current[0].className = current[0].className.replace(" gnstyle-active", "");
            this.className += " gnstyle-active";
        } 
    );
}

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

    var extend1 = document.getElementById("body1");
    var extend2 = document.getElementById("body2");
    var extend3 = document.getElementById("body3");

function Body1() {
    extend1.classList.add("body-wrap-e"),
    extend2.classList.remove("body-wrap-e2"),
    extend3.classList.remove("body-wrap-e3");
}

function Body2() {
    extend2.classList.add("body-wrap-e2"),
    extend1.classList.remove("body-wrap-e"),
    extend3.classList.remove("body-wrap-e3");
    
}

function Body3() {
    extend3.classList.add("body-wrap-e3"),
    extend1.classList.remove("body-wrap-e"),
    extend2.classList.remove("body-wrap-e2");
}