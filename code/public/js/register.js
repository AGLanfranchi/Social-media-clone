// Change the type of input to password or text
function Toggle() {
  var temp = document.getElementById("passwordInput");
  if (temp.type === "password") {
      temp.type = "text";
  } else {
      temp.type = "password";
  }
}

//  Call register API

let formInput = document.getElementById('registerForm');

formInput.addEventListener('submit', function (event) {
  event.preventDefault();
  let data = new FormData(formInput);


  //Call register API

  fetch('/api/register', {
    headers: {
      "Content-Type": "application/json"
    },

    method: "POST",
    body: utils.formDataToJSON(data)
  })
    // Deal wth response

    .then(function (result) {
      result.json().then(result => {
        console.log(result);

        if (result) {
          window.location = 'http://localhost:3000/login.html'
        } else {
          alert("Error registering account. Username could already be taken.")
        }
      })
    })
})