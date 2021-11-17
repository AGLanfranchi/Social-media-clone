const express = require('express')
const app = express()
const port = 3000

const Users = require('./src/users.js')
const funcs = require('./src/funcs.js')
const { request } = require('express')


// Tell Express to server HTML, JS, CSS etc from the public/ folder
// See: http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.json())

/
// Our API routes will be here
app.post('/api/login', function (req, res) {
  Users.login(req.body.username, req.body.password, result => {

    if (!result) {
      result = false
    }

    res.json(result)
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