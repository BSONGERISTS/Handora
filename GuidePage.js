document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded and ready');

    // get the parameters in the url
    const urlParams = new URLSearchParams(window.location.search);
    const guideID = urlParams.get("guideID");

    const parseMarkdown = (text) => {
        let parsedText = text
            .replace(/\[h1\](.*?)\[\/h1\]/g, '<h1>$1</h1>')
            .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
            .replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
            .replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>')
            .replace(/\[strike\](.*?)\[\/strike\]/g, '<del>$1</del>')
            .replace(/\[hr\]/g, '<hr>')
            // .replace(/\[img\](.*?)\[\/img\]/g, (match, filename) => `<img src="${uploadedMedia[filename]}" style="max-width: 100%;">`)
            // .replace(/\[video\](.*?)\[\/video\]/g, (match, filename) => `<video src="${uploadedMedia[filename]}" controls style="max-width: 100%;"></video>`)
            .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>');
        return parsedText;
    };

    if (guideID){
        fetch(`./GuidePage.php?guideID=${guideID}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                console.log(data);
                document.getElementById("guideTitlePreview").innerText = data.guide.title;
                document.getElementById("game-name-display-preview").textContent = data.guide.gameName;
                document.getElementById("username-display-preview").textContent = data.guide.username;
                document.getElementById("guideImagePreview").src = `./uploads/guide_pictures/${data.guide.image}`;
                document.getElementById("titlepubs").textContent = data.guide.description;
                document.getElementById("previewContent").innerHTML = parseMarkdown(data.guide.content);
            }
            else{
                window.location = './SearchResults.html';
            }
        })
        .catch(error => {
            console.error(error);
            window.location = './SearchResults.html'
        })
    }

    else{
        window.location = './SearchResults.html';
    }
});