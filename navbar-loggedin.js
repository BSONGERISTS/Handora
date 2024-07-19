document.addEventListener("DOMContentLoaded", function () {
    fetch('session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {

                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = './CSS/LogHandora.css';
                document.head.appendChild(link);

                // User is logged in, update the navbar
                document.getElementById('navbar-buttons').innerHTML = `
                    <nav class="nav-btn"> 
                        <img src="./Assets/Discord.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/x icon.png" class="nav-btn-size hover-icon" />
                    </nav>
                    
                    <nav class="profile popup">
                        <img src="./Assets/ProfilePlaceholder.svg" class="nav-btn-size" />
                    </nav>

                    <div id="pop" class="login-box login-index">
                        <img src="./Assets/PopTop.svg" class="pop-indicator">

                        <!-- Profile Btn -->
                        <a href="./ProfileHandora.html" class='pop-btn grid-top'>
                            View my Profile
                        <a>
                        <!-- Log Out btn -->
                        <a href="logout.php" class='pop-btn grid-bot'>
                            Log Out
                            <img src="./Assets/LogOut.svg">
                        </a>
                    </div>    
                ` ;
                
                // Previously on separate file called Logindex.js

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

                // document.getElementById('pop').style.display = 'none';
                // document.getElementById('pop-loggedin').style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching session status:', error));
});