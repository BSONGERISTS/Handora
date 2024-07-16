document.addEventListener("DOMContentLoaded", function () {
    fetch('session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                // User is logged in, update the navbar
                document.getElementById('navbar-buttons').innerHTML = `
                    <nav class="nav-btn"> 
                        <img src="./Assets/Discord.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/x icon.png" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="nav-btn">
                        <img src="./Assets/notifs.svg" class="nav-btn-size hover-icon" />
                    </nav>
                    <nav class="profile popup">
                        <img src="./Assets/ProfilePlaceholder.svg" class="nav-btn-size" />
                    </nav>
                ` ;
                document.getElementById('pop').style.display = 'none';
                document.getElementById('pop-loggedin').style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching session status:', error));
});