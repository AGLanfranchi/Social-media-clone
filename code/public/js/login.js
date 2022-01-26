// Change the type of input to password or text
function Toggle() {
    var temp = document.getElementById("passwordInput");
    if (temp.type === "password") {
        temp.type = "text";
    } else {
        temp.type = "password";
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
    let url = "/api/login"
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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


    callApi({ "username": username, "password": password }).then(login)
});



