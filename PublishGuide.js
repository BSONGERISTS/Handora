document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and ready');

    const guide_title = document.getElementById("guide_title");
    const guide_description = document.getElementById("guide_description");
    const game_title = document.getElementById("game-search");
    const guide_thumbnail = document.getElementById("guide_thumbnail");
    const guide_contents = document.getElementById("guide_contents");

    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener('click', () => {
        const payload = new FormData();
        payload.append("guide_title", guide_title.value);
        payload.append("guide_description", guide_description.value);
        payload.append("game_title", game_title.value);
        payload.append("guide_thumbnail", guide_thumbnail.files[0]); // Use files[0] instead of value
        payload.append("guide_contents", guide_contents.value);

        fetch('./PublishGuide.php', {
            method: "POST",
            body: payload
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
    });

    guide_title.addEventListener('input', () => {
        const guideTitleContent = document.getElementById("guideTitleContent");
        const guideTitlePreview = document.getElementById("guideTitlePreview");
        guideTitleContent.textContent = guide_title.value;
        guideTitlePreview.textContent = guide_title.value;
    });

    guide_description.addEventListener('input', () => {
        const descriptionPreview = document.getElementById("titlepubs");
        descriptionPreview.textContent = guide_description.value;
    });

    var GuideBtn = document.getElementById("guide-nav-btn");
    var GDBtn = GuideBtn.getElementsByClassName("guide-nav-style");

    for (var i = 0; i < GDBtn.length; i++) {
        GDBtn[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("gnstyle-active");
            current[0].className = current[0].className.replace(" gnstyle-active", "");
            this.className += " gnstyle-active";
        });
    }

    document.getElementById('game-search').addEventListener('input', showDropdown);

    var cropper;
    var uploadImageInput = document.getElementById('guide_thumbnail');
    var cropperImage = document.getElementById('cropper-image');

    uploadImageInput.addEventListener('change', function (event) {
        var files = event.target.files;
        var done = function (url) {
            cropperImage.src = url;
            showCropperPopup();
        };
        var reader;
        var file;

        if (files && files.length > 0) {
            file = files[0];

            // Update file input display
            const fileName = file.name;
            const label = document.querySelector('.custom-file-label');
            if (label) {
                label.textContent = fileName;
            }

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

    function showCropperPopup() {
        document.getElementById('cropper-popup').style.display = 'flex';
        cropper = new Cropper(cropperImage, {
            aspectRatio: 1.5,
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

                var newImageUrl = URL.createObjectURL(blob);
                document.getElementById("guideImageContent").src = newImageUrl;
                document.getElementById("guideImagePreview").src = newImageUrl;
                hideCropperPopup();
            });
        }
    };
});

document.getElementById('format').addEventListener('click', openformat);

document.querySelector('.pop-close-wrap button').addEventListener('click', togglegpop);

function togglePopup() {
    var pop = document.getElementById("pop");
    pop.classList.toggle("login-index");
}

function openformat() {
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
    extend1.classList.add("body-wrap-e");
    extend2.classList.remove("body-wrap-e2");
    extend3.classList.remove("body-wrap-e3");
}

function Body2() {
    extend2.classList.add("body-wrap-e2");
    extend1.classList.remove("body-wrap-e");
    extend3.classList.remove("body-wrap-e3");
}

function Body3() {
    extend3.classList.add("body-wrap-e3");
    extend1.classList.remove("body-wrap-e");
    extend2.classList.remove("body-wrap-e2");
}
