document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
});

// Create  Variable

// get id on element as variable
const signupform = document.getElementById("signupform");

signupform.addEventListener("submit", function(ev){

        ev.preventDefault();

        // get inputs from signupform
        const signupvalues = new FormData(signupform);

        // fetches data
        fetch ('./RegisterProcess.php', {
            // if submitting
            method: "POST",
            // pass through api
            body: signupvalues
        })

        //fetch data from process json V
            .then (response => response.json())
        //            ^ decode json 

        //              v use decoded data
                .then (data => { 
                    console.log(data);
                })

        .catch (error => console.error(error));

        console.log('tite')


});