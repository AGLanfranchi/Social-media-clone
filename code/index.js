const express = require('express')
const app = express()
const port = 3000

const Users = require('./src/users.js')
const Posts = require('./src/posts.js')
const funcs = require('./src/funcs.js')
const { request } = require('express')


// Tell Express to server HTML, JS, CSS etc from the public/ folder
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

app.post('/api/posts', function (req, res) {
  Posts.insertPost(req.body.title, req.body.body, result => {

    console.log(req.body);
    res.send({});
    
    if (!result) {
      result = false
    }

    res.json(result)

  })
})


// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)