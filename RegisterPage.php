<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="img/png" href="./pics/Siopao.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Handora</title>
    <link rel="stylesheet" href="CSS/Registerstyles.css">
</head>


<body>

    <!-- Navbar -->
    <div id="head" class="header">
        <!-- Inside Navbar -->
        <div class="wrap">

            <!-- Navbar Logo -->
            
            <a href="HandoraBSong.html"><img src="./Assets/WebNL.svg" class="logo"/></a>
            
            <!-- Navbar Buttons -->
            <div class="header-buttons">
                
                <nav class="nav-btn"> 
                    <img src="./Assets/Discord.svg" class="nav-btn-size nav-btn-size"/>
                    <img src="./Assets/Dhover.svg" class="nav-btn-size hover-icon"/>
                </nav>

                <nav class="nav-btn">
                    <img src="./Assets/x icon.png" class="nav-btn-size"/>
                    <img src="./Assets/HXicon.svg" class="nav-btn-size hover-icon"/>
                </nav>

                <nav class="nav-btn right-margin" >
                        <img src="./Assets/BackBtn.svg" class="nav-btn-size"/>
                        <a href="./HandoraBSong.php"><img src="./Assets/HoverBack.svg" class="nav-btn-size hover-icon"/></a>
                </nav>

            </div>
        </div>
    </div>
    
    <!-- Container -->
    <div class="Container">
        <!-- background -->
        <div class="background">
            <img src="./Assets/RegisterBG.svg">
        </div>

        <div class="Register-Wrap">
            <div class="Register-Contents">
                <!-- Title -->
                <div class="Register-title">CREATE YOUR ACCOUNT</div>
                
                <form class="Panel-Gap" id="signupform">
                    <!-- Username --> 
                    <div class="Panel">
                        <div class="Panel-Text">Username</div>
                        <div class="Input-Style">
                            <input type="text" name="Input-Username">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="Panel">
                        <div class="Panel-Text">Email Address</div>
                        <div class="Input-Style">
                            <input type="email" name="Input-Email">
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="Panel">
                        <div class="Panel-Text">Password</div>
                        <div class="Input-Style">
                            <input type="password" name="Input-Password">
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="Panel">
                        <div class="Panel-Text">Confirm Password</div>
                        <div class="Input-Style">
                            <input type="password" name="Input-Password-2">
                        </div>
                    </div>

                    <button type="submit" class="continue-btn">Continue</button>

                </form> 

            </div>
        </div> 

    </div>

    <div class="footer">
        <div class="footer-wrap">
            <!-- left footer -->
            <img src="./Assets/HandoraFoot.svg">

            <!-- right footer -->
            <div class="footer-content">
                <!-- right top -->
                <div class="line-border"></div>

                <div class="footer-text">© 2024 handora. All rights reserved. All trademarks are property of their respective owners yada yada etc.</div>
                
                <!-- rules -->
                <div class="footer-text footer-mid">
                    <a href="">Privacy Policy</a>
                    <div class="footer-text">|</div>
                    <a href="">Legal</a>
                    <div class="footer-text">|</div>
                    <a href="">Cookies</a>
                </div>

                <div class="line-border"></div>
                
                <div class="footer-bot">
                    <a href="">About Handora</a>
                    <div class="footer-bot">|</div>
                    <a href="">Moderation</a>
                    <div class="footer-bot">|</div>
                    <a href="">Support</a>
                </div>

            </div>
        </div>
    </div>


    <script src="./RegisterScript.js"></script>
</body>
</html>
