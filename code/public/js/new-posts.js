 // Use fetch to call the  API

 function callApi(data) {
    let url="/api/posts"
    let options ={
        method: "POST",
             headers: {
                "Content-Type" : "application/json"
        },
                body: JSON.stringify(data)
            }

    return fetch(url, options).then(response => response.json());
}

        let formInput = document.getElementById("postsForm");

        // Add submit event listener.
        formInput.addEventListener("submit", (event) => { 
             event.preventDefault();

             // Capture the input values using FormData

                let data = new FormData(formInput);
                let title = data.get("title");
                let body = data.get("body");
                    
             callApi({"title": title, "body": body})
             .then(response => {

                // Hides or removes the HTML error message depedning on login 
                

                /*let loginErrorMsg = document.getElementById("loginErrorMessage");

                 if(!response) {
                    loginErrorMsg.classList.remove('hidden');
                 } else {
                    loginErrorMsg.classList.add('hidden');
                    window.location = 'http://localhost:3000/new-posts.html'
                 }*/
             })



});