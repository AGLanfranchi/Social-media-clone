//  Call register API

function callApi(data) {
  let url="/api/register"
  let options ={
  method: "POST",
  headers: {
      "Content-Type" : "application/json"
  },
  body: JSON.stringify(data)
}

  return fetch(url, options).then(response => response.json());
}



function checkRegistration() {
  let username = document.forms["registerForm"]["usernameInput"];
  let password = document.forms["registerForm"]["passwordInput"];
  let passwordRepeat = document.forms["registerForm"]["passwordInputRepeat"];


  if (username.value == "") {
      window.alert(
        "Please enter a valid e-mail address.");
      email.focus();
      return false;
  }

  if (password.value == "") {
      window.alert("Please enter your password");
      password.focus();
      return false;
  }

  if (passwordRepeat.value != password.value) {
    window.alert("Your passwords don't match");
    password.focus();
    return false;
}

  return true;
}