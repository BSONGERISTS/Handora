document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready');
});


var head = document.getElementById("head");

var btns = head.getElementsByClassName("popup");

// Loop through all buttons and the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("login-index");
        // If there is an element with the "login-index" class, remove it
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" login-index", " meow");
        }
    });
}

var pop = document.getElementById("pop");

var kill = pop.getElementsByClassName("closer");

for (var i =0; i < kill.length; i++){
    kill[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("meow");

        if (current.length > 0) {
            current [0].className = current[0].className.replace(" meow", " login-index");
        }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    
    togglePassword.addEventListener('mousedown', function () {
        passwordInput.setAttribute('type', 'text');
    });

    togglePassword.addEventListener('mouseup', function () {
        passwordInput.setAttribute('type', 'password');
    });

    togglePassword.addEventListener('mouseleave', function () {
        passwordInput.setAttribute('type', 'password');
    });
});
