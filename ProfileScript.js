document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');

    fetch('session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                document.querySelector('.display-name').innerText = data.username;
                document.getElementById('name').value = data.username;
                document.getElementById('e-mail').value = data.email;
                document.getElementById('welcome-username').innerText = data.username;

                // Update profile picture
                if (data.profile_picture) {
                    var profilePicUrl = data.profile_picture + '?' + new Date().getTime();
                    document.getElementById('user-prof').src = profilePicUrl;
                    document.getElementById('top-profile-pic').src = profilePicUrl;
                }

                document.querySelector('.change-style.cancel').addEventListener('click', () => {
                    // Reset the form values to the original data
                    document.getElementById('name').value = data.username;
                    document.getElementById('e-mail').value = data.email;
                });

            } else {
                // Redirect to login page or show an error message
                window.location.href = './HandoraBSong.html';
            }
        })
        .catch(error => console.error('Error fetching session status:', error));

    const updateProfileForm = document.getElementById("updateProfile");

    updateProfileForm.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const formData = new FormData(updateProfileForm);

        fetch('./ProfileScriptProcess.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    alert('Profile updated successfully');

                    // Update the displayed username and email without refreshing
                    const newUsername = formData.get('input_username');
                    const newEmail = formData.get('input_email');
                    document.querySelector('.display-name').innerText = newUsername;
                    document.getElementById('name').value = newUsername;
                    document.getElementById('e-mail').value = newEmail;
                    document.getElementById('welcome-username').innerText = newUsername;
                } else {
                    alert('Failed to update profile: ' + data.message);
                }
            })
            .catch(error => console.error('Error updating profile:', error));
    });

    document.getElementById('Guide').addEventListener('click', guide);
    document.getElementById('Diss').addEventListener('click', diss);

    document.getElementById('confirm-password-change').addEventListener('click', () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        const formData = new FormData();
        formData.append('current_password', currentPassword);
        formData.append('new_password', newPassword);

        fetch('./update_password.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Password updated successfully');
                    PopClose2();
                } else {
                    alert('Failed to update password: ' + data.message);
                }
            })
            .catch(error => console.error('Error updating password:', error));
    });

    document.querySelector('.pop-cancel2').addEventListener('click', () => {
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        PopClose2();
    });

    var cropper;
    var uploadImageInput = document.getElementById('upload-image');
    var cropperImage = document.getElementById('cropper-image');

    uploadImageInput.addEventListener('change', function (event) {
        var files = event.target.files;
        var done = function (url) {
            uploadImageInput.value = '';
            cropperImage.src = url;
            showCropperPopup();
        };
        var reader;
        var file;
        var url;

        if (files && files.length > 0) {
            file = files[0];

            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function (event) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    function showCropperPopup() {
        document.getElementById('cropper-popup').style.display = 'flex';
        cropper = new Cropper(cropperImage, {
            aspectRatio: 1,
            viewMode: 2,
            autoCropArea: 1,
            responsive: true,
            background: false,
            zoomable: true,
            movable: true,
            scalable: true
        });
    }

    function hideCropperPopup() {
        document.getElementById('cropper-popup').style.display = 'none';
        cropper.destroy();
        cropper = null;
    }

    window.showCropperPopup = showCropperPopup;
    window.hideCropperPopup = hideCropperPopup;

    window.cropImage = function () {
        var canvas;
        if (cropper) {
            canvas = cropper.getCroppedCanvas({
                width: 300,
                height: 300,
            });
            canvas.toBlob(function (blob) {
                var formData = new FormData();
                formData.append('croppedImage', blob);
                fetch('ProfileScriptProcess.php', {
                    method: 'POST',
                    body: formData,
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.status === 'success') {
                        alert('Profile picture updated successfully');
                        // Update profile picture on the frontend
                        var newImageUrl = URL.createObjectURL(blob);
                        document.getElementById('user-prof').src = newImageUrl;
                        document.getElementById('top-profile-pic').src = newImageUrl; //for this to work add the id top-profile pic to navbar-logged.js line 45
                        hideCropperPopup();
                    } else {
                        alert('Failed to update profile picture');
                    }
                }).catch((error) => {
                    console.error('Error:', error);
                });
            });
        }
    };


    // GET THE GUIDES OF THE USER
    fetch('./ProfileGuide.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.guides.forEach(guide => {
                const guideTemplate = document.querySelector("[data-guide-template]");
                const card = guideTemplate.content.cloneNode(true);

                const guideImage = card.querySelector('[data-guide-image]');
                const guideTitle = card.querySelector('[data-guide-title]');
                const guideCreator = card.querySelector('[data-guide-creator]');
                const guideContent = card.querySelector('[data-guide-content]');

                guideImage.src = `./uploads/guide_pictures/${guide.image}`;
                guideTitle.textContent = guide.title;
                guideCreator.append(`${guide.gameName} Guide by ${guide.username}`);
                guideContent.append(guide.description);

                document.getElementById("guideContainer").appendChild(card);
            });
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });



});

var header = document.getElementById("butts");
var btns = header.getElementsByClassName("btn-style");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

function guide() {
    var element = document.getElementById("1s");
    element.classList.add("position");

    var element2 = document.getElementById("2s");
    element2.classList.remove("position");
}

function diss() {
    var element3 = document.getElementById("1s");
    element3.classList.remove("position");

    var element4 = document.getElementById("2s");
    element4.classList.add("position");
}

function PopOpen2() {
    var PopElementOpen2 = document.getElementById("pop2");
    PopElementOpen2.classList.remove("pop-index2");
}

function PopClose2() {
    var PopElementClose2 = document.getElementById("pop2");
    PopElementClose2.classList.add("pop-index2");
}

function Prof1() {
    var Prof1 = document.getElementById("user-prof");
    Prof1.src = "./Assets/MCLogo.svg";
}
