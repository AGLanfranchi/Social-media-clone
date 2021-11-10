const express = require('express')
const app = express()
const port = 3000

const Users = require('./src/users.js')
const funcs = require('./src/funcs.js')

// Users.test()


// Tell Express to server HTML, JS, CSS etc from the public/ folder
// See: http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.json())

/
// Our API routes will be here
app.post('/api/login', function (req, res) {
  let loggedIn = false;

  req.body.username
  req.body.password

  // if (req.body.username == 'Adam' && req.body.password == 'password') {
    // loggedIn = true;
    // console.log("Well done");
  
  // Return the response by calling our function  
  // }

  res.send({
    loggedIn: loggedIn
 })

})

// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)






/* if(username == "Adam" && password == "hello"){
            alert("Well done");
        }else {
            alert("Wrong!");
        }
        */

// res.send({ loggedIn: true })
// res.send({ loggedIn: false })
// req.body.username
// req.body.password

/* 

let loggedIn = false;
if (req.body.username == 'bob' && req.body.password == 'password') {
    loggedIn = true;
}

res.send({
    loggedIn: loggedIn
})

*/