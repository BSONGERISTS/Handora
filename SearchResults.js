

// Search nav \\
var header = document.getElementById("snav");
// 
var btans = header.getElementsByClassName("search-btn");
// 
for (var i = 0; i < btans.length; i++) {
        btans[i].addEventListener("click", function() {
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

function PopOpen() {
    var PopOpen = document.getElementById("top-pop");
    if (PopOpen.classList.contains("draw")) {
        PopOpen.classList.remove("draw");
    } else {
        PopOpen.classList.add("draw");
    }
}

function Extend() {
    var Popex = document.getElementById("bot-pop");
    if (Popex.classList.contains("drag")) {
        Popex.classList.remove("drag");
    } else {
        Popex.classList.add("drag");
    }
}

function ShowAll() {
    document.querySelectorAll('.none1').forEach(element => {
        element.classList.remove('none1');
        element.classList.add('guide-post');
    });
    document.querySelectorAll('.none').forEach(element => {
        element.classList.remove('none');
        element.classList.add('discussion-post');
    });
}

function ShowGuide() {
    document.querySelectorAll('.none1').forEach(element => {
        element.classList.remove('none1');
        element.classList.add('guide-post');
    });
    document.querySelectorAll('.discussion-post').forEach(element => {
        element.classList.add('none');
        element.classList.remove('discussion-post');
    });
}

function ShowDiscussion() {
    document.querySelectorAll('.guide-post').forEach(element => {
        element.classList.add('none1');
        element.classList.remove('guide-post');
    });
    document.querySelectorAll('.none').forEach(element => {
        element.classList.remove('none');
        element.classList.add('discussion-post');
    });
}


