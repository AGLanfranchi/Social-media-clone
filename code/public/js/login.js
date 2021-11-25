// Use fetch to call the  API

function callApi(data) {
    let url="/api/login"
 let options ={
     method: "POST",
     headers: {
         "Content-Type" : "application/json"
     },
     body: JSON.stringify(data)
  }

    return fetch(url, options).then(response => response.json());
}

let formInput = document.getElementById("loginForm");
    
                    // Add submit event listener.
	                formInput.addEventListener("submit", (event) => { 
	        	         event.preventDefault();

                         // Capture the input values using FormData

                            let data = new FormData(formInput);
		                    let username = data.get("username");
                            let password = data.get("password");
                                
                         callApi({"username": username, "password": password})
                         .then(response => {

                            // Hides or removes the HTML error message depedning on login 

                            let loginErrorMsg = document.getElementById("loginErrorMessage");

                             if(!response) {
                                loginErrorMsg.classList.remove('hidden');
                             } else {
                                loginErrorMsg.classList.add('hidden');
                                window.location = 'http://localhost:3000/new-posts.html'
                             }
                             
                         })



         });

         