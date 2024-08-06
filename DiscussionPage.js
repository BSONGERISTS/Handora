document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded and ready');

    // get the parameters in the url
    const urlParams = new URLSearchParams(window.location.search);
    const discussionID = urlParams.get("discussionID");

    if (discussionID){
        fetch(`./DiscussionPage.php?discussionID=${discussionID}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const rawPublishDate = new Date(data.discussion.publishDate);
                const publishDate = months[rawPublishDate.getMonth()] + ' ' + rawPublishDate.getDate() + ', ' + rawPublishDate.getFullYear();
                
                document.querySelector(".Uname").innerHTML = data.discussion.username;
                document.getElementById("userIMG").src = data.discussion.profile_picture;
                document.querySelector(".date-txt").innerHTML = publishDate;
                document.querySelector(".diss-title").innerHTML = data.discussion.title;
                document.querySelector(".header-body").innerHTML = data.discussion.content;
                document.getElementById("gameName").textContent = data.discussion.gameName



                // document.getElementById("guideTitlePreview").innerText = data.guide.title;
                // document.getElementById("game-name-display-preview").textContent = data.guide.title;
                // document.getElementById("username-display-preview").textContent = data.guide.username;
                // document.getElementById("guideImagePreview").src = `./uploads/guide_pictures/${data.guide.image}`;
                // document.getElementById("titlepubs").textContent = data.guide.description;
                // document.getElementById("previewContent").innerHTML = parseMarkdown(data.guide.content);
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