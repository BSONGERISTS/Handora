document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded and ready');
    document.getElementById('game-search').addEventListener('input', showDropdown);

    var guideArray = [];
    var discussionArray = [];

    // this gets the guides and discussions
    fetch('./getGuideDiscussion.php')
        .then(response => response.json())
        .then(data => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            guideArray = data.guides.map(guide => {
                const guideTemplate = document.querySelector("[data-guide-template]");
                const card = guideTemplate.content.cloneNode(true).children[0];

                const guideImage = card.querySelector('[data-guide-image]');
                const guideTitle = card.querySelector('[data-guide-title]');
                const guideCreator = card.querySelector('[data-guide-creator]');
                const guideContent = card.querySelector('[data-guide-content]');

                guideImage.src = `./uploads/guide_pictures/${guide.image}`;
                guideTitle.textContent = guide.title;
                guideCreator.append(`${guide.gameName} Guide by ${guide.username}`);
                guideContent.append(guide.description);

                card.addEventListener('click', () => {
                    window.location = `GuidePage.html?guideID=${guide.id}`;
                });

                const likeBtn = card.querySelector('.heart-icon');
                const numberOfLikesElement = card.querySelector('.like-font');
                let numberOfLikes = Number.parseInt(numberOfLikesElement.innerText, 10);
                let isLiked = false;

                // Functions

                const likeClick = () => {
                    if (!isLiked) {
                        likeBtn.classList.add('isLiked');
                        numberOfLikes++;
                        numberOfLikesElement.innerText = numberOfLikes;
                        isLiked = true;
                    } else {
                        likeBtn.classList.remove('isLiked');
                        numberOfLikes--;
                        numberOfLikesElement.innerText = numberOfLikes;
                        isLiked = false;
                    }
                };

                // Event Listeners

                likeBtn.addEventListener('click', likeClick);

                document.getElementById("all").appendChild(card);

                return {
                    title: guide.title,
                    element: card
                }

            });

            discussionArray = data.discussions.map(discussion => {
                const discussionTemplate = document.querySelector("[data-discussion-template]");
                const card = discussionTemplate.content.cloneNode(true).children[0];

                const discussionTitle = card.querySelector('[data-discussion-title]');
                const discussionGame = card.querySelector('[data-discussion-game]');
                const discussionDate = card.querySelector('[data-discussion-date]');

                // convert the publishdate
                const rawPublishDate = new Date(discussion.publishDate);
                const publishDate = months[rawPublishDate.getMonth()] + ' ' + rawPublishDate.getDate() + ', ' + rawPublishDate.getFullYear();

                discussionTitle.textContent = discussion.title;
                discussionGame.append(`${discussion.gameName} | Discussion`);
                discussionDate.append(publishDate);

                card.addEventListener('click', () => {
                    window.location = `DiscussionPage.html?discussionID=${discussion.id}`;
                });

                document.getElementById("all").appendChild(card);

                return {
                    title: discussion.title,
                    element: card
                }
            });

            filtering();

        })
        .catch(error => console.error(error));

    
    // get the parameters in the url
    const urlParams = new URLSearchParams(window.location.search);
    const searchInputURLValues = urlParams.get("searchInputURLValues");

    const searchInput = document.getElementById("searchInput");
    searchInput.value = searchInputURLValues;

    filtering = () => {
        guideArray.forEach (guide => {
            const CardVisibility = guide.title.toLowerCase().includes(searchInput.value.toLowerCase());
            guide.element.style.display = CardVisibility ? "" : "none";
        })

        discussionArray.forEach (discussion => {
            const CardVisibility = discussion.title.toLowerCase().includes(searchInput.value.toLowerCase());
            discussion.element.style.display = CardVisibility ? "" : "none";
        })
    }

    searchInput.addEventListener('input', () => {
        filtering();
    });



    // this is your form
    const formDiscussion = document.getElementById("top-pop");
    formDiscussion.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const payload = new FormData(formDiscussion);

        fetch('./CreateDiscussion.php', {
            method: "POST",
            body: payload
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));

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
                    data.sort((a, b) => {
                        if (a.toLowerCase().startsWith(filter) && !b.toLowerCase().startsWith(filter)) {
                            return -1;
                        }
                        if (!a.toLowerCase().startsWith(filter) && b.toLowerCase().startsWith(filter)) {
                            return 1;
                        }
                        return a.localeCompare(b);
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

    // Load navbar.html into the div with id 'navbar-container'
    loadNavbar();












});

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            loadNavbarCSS();
            updateNavbarForLoggedInUser();
            addPopupEventListeners(); // Ensure event listeners are attached
        });
}

function loadNavbarCSS() {
    const cssFiles = [
        './CSS/HandoraMain.css', // Add other necessary CSS files here
        './CSS/LogHandora.css'   // CSS for the logged-in navbar
    ];

    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    });
}

function updateNavbarForLoggedInUser() {
    fetch('session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                var profilePicUrl = data.profile_picture + '?' + new Date().getTime();
                document.getElementById('navbar-buttons').innerHTML = `
                    <nav class="nav-btn"> 
                        <img src="./Assets/Discord.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/x icon.png" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="profile popup">
                        <img id="top-profile-pic" src="${profilePicUrl}" class="nav-btn-size" />
                    </nav>
                    <div id="pop" class="login-box login-index2">
                        <img src="./Assets/PopTop.svg" class="pop-indicator">
                        <a href="./ProfileHandora.html" class='pop-btn grid-top'>View my Profile</a>
                        <a href="logout.php" class='pop-btn grid-bot'>Log Out <img src="./Assets/LogOut.svg"></a>
                    </div>
                `;
                // change the image picture discussion
                document.getElementById("user-pic-container").src = profilePicUrl;
                

                addPopupEventListeners(); // Reattach event listeners for the updated navbar

                document.getElementById("make-discuss").addEventListener('click', () => {
                    PopOpen()
                    Extend()
                })

                document.getElementById("publishGuideButton").addEventListener('click', () => {
                    window.location ="./PublishGuide.html"
                });

            } else {
                document.getElementById('navbar-buttons').innerHTML = `
                    <nav class="nav-btn"> 
                        <img src="./Assets/Discord.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/x icon.png" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="Nav-Style popup"><span>Login</span></nav>
                `;
                addPopupEventListeners();
                document.getElementById("make-discuss").addEventListener('click', () => {
                    document.getElementById('pop').classList.toggle('login-index2');
                })

                document.getElementById("publishGuideButton").addEventListener('click', () => {
                    document.getElementById('pop').classList.toggle('login-index2');
                });

                // Redirect to login page or show an error message
                // window.location.href = './HandoraBSong.html';
            }
        })
        .catch(error => console.error('Error fetching session status:', error));
}

function addPopupEventListeners() {
    const popups = document.getElementsByClassName('popup');
    for (let popup of popups) {
        popup.addEventListener('click', () => {
            document.getElementById('pop').classList.toggle('login-index2');
        });
    }

    const closer = document.querySelector('.closer2');
    if (closer) {
        closer.addEventListener('click', () => {
            document.getElementById('pop').classList.add('login-index2');
        });
    }



    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('mousedown', () => passwordInput.setAttribute('type', 'text'));
        togglePassword.addEventListener('mouseup', () => passwordInput.setAttribute('type', 'password'));
        togglePassword.addEventListener('mouseleave', () => passwordInput.setAttribute('type', 'password'));
    }
}


// Search nav \\
var header = document.getElementById("snav");
// 
var btans = header.getElementsByClassName("search-btn");
// 
for (var i = 0; i < btans.length; i++) {
    btans[i].addEventListener("click", function () {
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
    dropbtn[i].addEventListener("click", function () {
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


