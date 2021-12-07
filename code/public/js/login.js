// Use fetch to call the API

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
                        
                                
                         callApi({"username": username, "password": password}).then(user => {

                             // Token code here

                            // function(user) {
                            user.json().then(user => {
                                console.log(user)

                                //Log the user in by storing their token

                                if (user && user.token) {
                                    window.sessionStorage.setItem('token', user.token) // Save the user's API token
                                    window.sessionStorage.setItem('username', user.username)
                                }
                           

                            // Hides or removes the HTML error message depedning on login 

                            let loginErrorMsg = document.getElementById("loginErrorMessage");

                             if(!user) {
                                loginErrorMsg.classList.remove('hidden')
                             } else {
                                loginErrorMsg.classList.add('hidden')
                                window.location = 'http://localhost:3000/index.html'
                             }
                             
                                                    })

                         });

         // Change the type of input to password or text
         function Toggle() {
             var temp = document.getElementById("passwordInput");
             if (temp.type === "password") {
                 temp.type = "text";
             }
             else {
                 temp.type = "password";
             }
            }
        }
    })
    
    