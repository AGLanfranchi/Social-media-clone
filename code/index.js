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

function okResponse(res, code) {
  res.status(code).send({})
}

function notAllowed(res) {
  res.status(401).send({
      error: "Not authorised"
  })
}

// Our API routes will be here
app.post('/api/login', function (req, res) {
  Users.login(req.body.username, req.body.password, result => {

    if (!result) {
      result = false
    }

    res.json(result)
  })
})

app.post('/api/post', function (req, res) {
  //Get the API token from the header provided by the front-end fetch request
  let apiToken = req.get('X-API-Token');

  if(apiToken) {
    // Find user by token
    Users.findByToken(apiToken, user => {
      if(user) {
        console.log(req.body)
        Posts.insertPost(req.body.title, req.body.body, result => {

          console.log(req.body);
      
          if (!result) {
            result = false
          }
      
          res.json(result)
      
        })
        // Posts.create(req.body, user).then(result => {
        //   // Return 201: Created response
        //   okResponse(res, 201);
        // })
      } else {
        // Invalid API token
        notAllowed(res)
        console.log("Invalid API token")
      }
    })
  } else {
    // Missing API token
    notAllowed(res)
    console.log("Missing API token")
  }
})

app.get('/api/posts', (req, res) => {
  let limit = 3
  let offset = req.query.offset

  console.log(offset)
  
  Posts.getPosts(offset, limit, (result) => {
    res.json(result) 
  })
  // res.send({})
})



// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)