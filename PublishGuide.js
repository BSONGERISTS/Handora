document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready');

    var GuideBtn = document.getElementById("guide-nav-btn");
    var GDBtn = GuideBtn.getElementsByClassName("guide-nav-style");

    for (var i = 0; i < GDBtn.length; i++) {
        GDBtn[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("gnstyle-active");
            current[0].className = current[0].className.replace(" gnstyle-active", "");
            this.className += " gnstyle-active";
        });
    }

    document.getElementById('game-search').addEventListener('input', showDropdown);
});

function showDropdown() {
    const input = document.getElementById('game-search');
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';

    if (filter.length > 0) {
        fetch(`fetch_games.php?keyword=${filter}`)
            .then(response => response.json())
            .then(data => {
                // Sort data to prioritize games that start with the filter
                data.sort((a, b) => {
                    if (a.toLowerCase().startsWith(filter) && !b.toLowerCase().startsWith(filter)) {
                        return -1;
                    }
                    if (!a.toLowerCase().startsWith(filter) && b.toLowerCase().startsWith(filter)) {
                        return 1;
                    }
                    return a.localeCompare(b); // Sort alphabetically as a fallback
                });

                data.forEach(game => {
                    const gameElement = document.createElement('a');
                    gameElement.innerHTML = game;
                    gameElement.onclick = () => {
                        input.value = game;
                        dropdown.innerHTML = '';
                        dropdown.style.display = 'none';
                    };
                    dropdown.appendChild(gameElement);
                });
                dropdown.style.display = data.length ? 'block' : 'none';
            })
            .catch(error => console.error('Error fetching games:', error));
    } else {
        dropdown.style.display = 'none';
    }
}

// Function to toggle the pop-up visibility
function togglePopup() {
    var pop = document.getElementById("pop");
    pop.classList.toggle("login-index");
}

function openformat(){
    var gpop = document.getElementById("gpop");
    gpop.classList.remove("login-index");
}

function togglegpop() {
    var gpop = document.getElementById("gpop");
    gpop.classList.add("login-index");
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
