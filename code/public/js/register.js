var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

function login(user) {
    let loginErrorMsg = document.getElementById("loginErrorMessage")
    if (user && user.token) {
        window.sessionStorage.setItem('token', user.token) // Save the user's API token
        window.sessionStorage.setItem('username', user.username)
        loginErrorMsg.classList.add('hidden')
        window.location = 'http://localhost:3000/index.html'
    } else {
        loginErrorMsg.classList.remove('hidden')
    }
}

// Use fetch to call the API

// function callApi(url, data) look at moving this later to another file

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
                    
                            
                     callApi({"username": username, "password": password}).then(login)
});



