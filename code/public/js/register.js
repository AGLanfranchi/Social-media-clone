//  Call register API

let formInput = document.getElementById('registerForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let data = new FormData(formInput);


  //Call register API

  fetch('/api/register', {
    headers: {
      "Content-Type" : "application/json"
    },

    method: "POST",
    body: utils.formDataToJSON(data)
  })
// Deal wth response

.then(function(result){
  result.json().then(result => {
    console.log(result);

    if(result){
      //TODO
      }
    })
  })
})