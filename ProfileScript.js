document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');

    fetch('session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                document.querySelector('.display-name').innerText = data.username;
                document.getElementById('name').value = data.username;
                document.getElementById('e-mail').value = data.email;
            } else {
                // Redirect to login page or show an error message
                window.location.href = './HandoraBSong.html';
            }
        })
        .catch(error => console.error('Error fetching session status:', error));

    // const updateProfile = document.getElementById("updateProfile");      // naka comment tas lalagyan ng form
    // console.log (updateProfile);

    // // if there is submit on form
    // updateProfile.addEventListener('submit', (ev) => {
    //     // prevent website from loading
    //     ev.preventDefault();
        
    //     const formdata = new FormData(updateProfile);

    //     fetch ('./ProfileScriptProcess.php',{
    //         method: "POST",
    //         body: formdata
    //     })
    //     .then (response => response.json())
    //         .then (data => {
    //             console.log(data);
    //         })
    // })

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

function PopOpen2(){
    var PopElementOpen2 = document.getElementById("pop2");
    PopElementOpen2.classList.remove("pop-index2")
}

function PopClose2(){
    var PopElementClose2 = document.getElementById("pop2");
    PopElementClose2.classList.add("pop-index2")
}

function Prof1(){
    var Prof1 = document.getElementById("user-prof");
    Prof1.src = "./Assets/MCLogo.svg";
}