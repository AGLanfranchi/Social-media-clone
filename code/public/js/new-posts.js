 // Use fetch to call the  API

 function callApi(data) {
    let url="/api/post"
    let options ={
        method: "POST",
              headers: {
                "X-API-Token": window.sessionStorage.getItem('token')
        //         "Content-Type" : "application/json"
         },
                body: data
                // JSON.stringify(data)
            }

    return fetch(url, options).then(response => response.json());
}

        let formInput = document.getElementById("postsForm");

        // Add submit event listener.
        formInput.addEventListener("submit", (event) => { 
             event.preventDefault();

             // Capture the input values using FormData

                let data = new FormData(formInput);
                // let title = data.get("title");
                // let body = data.get("body");
                    
             callApi(data)
             .then(response => {

                
             })



});
