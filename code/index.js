const express = require('express')
const app = express()
const port = 3000

const Users = require('./src/users.js')
const Posts = require('./src/posts.js')
const funcs = require('./src/funcs.js')
const { request } = require('express')

const UUID = require('uuid')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, UUID.v4() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

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

app.post('/api/post', upload.single('image'), function (req, res) {
  //Get the API token from the header provided by the front-end fetch request
  let apiToken = req.get('X-API-Token');

  if(apiToken) {
    // Find user by token
    console.log(apiToken)
    Users.findByToken(apiToken, user => {
      console.log(user)
      if(user) {
        console.log(req.file)
        
        if (req.file){
          let filepath = req.file.filename
         

        // function needs to go here for images....
        Posts.imageUpload(filepath, postImage => {

                Posts.insertPost(req.body.title, req.body.body, user.id, postImage.lastID, result => {

                // console.log(req.body);
            
                if (!result) {
                  result = false
                }
            
                res.json(result)
            
              })
      
          if (!result) {
            result = false
          }
      
          res.json(result)
      
        })
        } else {
          
          Posts.insertPost(req.body.title, req.body.body, user.id, null, result => {

            // console.log(req.body);
        
            if (!result) {
              result = false
            }
        
            res.json(result)
        
          })
        }
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
})



// Tell us where we're running from
console.log("Server running on http://localhost:" + port)
app.listen(port)