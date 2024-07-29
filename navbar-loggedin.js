// Load navbar.html into the div with id 'navbar-container'
document.addEventListener("DOMContentLoaded", function () {
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
                document.getElementById('navbar-buttons').innerHTML = `
                    <nav class="nav-btn"> 
                        <img src="./Assets/Discord.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/x icon.png" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="profile popup">
                        <img src="${data.profile_picture}" class="nav-btn-size" />
                    </nav>
                    <div id="pop" class="login-box login-index2">
                        <img src="./Assets/PopTop.svg" class="pop-indicator">
                        <a href="./ProfileHandora.html" class='pop-btn grid-top'>View my Profile</a>
                        <a href="logout.php" class='pop-btn grid-bot'>Log Out <img src="./Assets/LogOut.svg"></a>
                    </div>
                `;

                addPopupEventListeners(); // Reattach event listeners for the updated navbar
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
                addPopupEventListeners(); // Reattach event listeners for the updated navbar
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


