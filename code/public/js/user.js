function logout() {
    let options = {
        method: "POST",
        headers: {
            "X-API-Token": window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        }
    };
    fetch('/api/logout', options).then(response => {
        window.sessionStorage.removeItem('token') // Save the user's API token
        window.sessionStorage.removeItem('username')
        window.location = 'http://localhost:3000/index.html'
    })
}

function loginLink() {
    let menu = document.getElementsByClassName("menu")[0]
    let token = window.sessionStorage.getItem('token')
    let li = document.createElement('li');
    let a = document.createElement('a')
    if (token != null) {
        a.innerText = "Logout"
        a.href = "#"
        a.addEventListener("click", (event) => {
            event.preventDefault()
            logout()
        })
    } else {
        a.innerText = "Login"
        a.href = "/login.html"
    }
    li.appendChild(a)
    menu.appendChild(li)
}

loginLink()