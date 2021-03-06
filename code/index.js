const express = require('express')
const app = express()
const port = 3000

const Users = require('./src/users.js')
const Posts = require('./src/posts.js')
const Comments = require('./src/comments.js')
const funcs = require('./src/funcs.js')
const { request } = require('express')
const htmlEscaper = require('html-escaper')

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
}),

app.post('/api/logout', function (req, res) {
  let apiToken = req.get('X-API-Token');
  Users.findByToken(apiToken, user => {
    Users.logout(user.id, result => {
      if (!result) {
        result = false
      }
      res.json(result)
    })
  })
}),

  app.post('/api/post', upload.single('image'), function (req, res) {
    //Get the API token from the header provided by the front-end fetch request
    let apiToken = req.get('X-API-Token');

    if (apiToken) {
      // Find user by token
      console.log(apiToken)
      Users.findByToken(apiToken, user => {
        console.log(user)
        if (user) {
          console.log(req.file)

          if (req.file) {
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

  app.post('/api/comment', function (req, res) {
    //Get the API token from the header provided by the front-end fetch request
    console.log(req.body)
    let apiToken = req.get('X-API-Token');
    Users.findByToken(apiToken, user => {
      Comments.insertComment(req.body.comment, req.body.post_id, user.id, (result) => {
        console.log("Post comment api:", result)
        res.status(200).json(result);
      })
    })
  })

  app.post('/api/register', function (req, res) {
    console.log(req.body)
    Users.register(req.body.username, req.body.password, function (result) {
      res.json(result)
    })
  })

  app.post('/api/like', function (req, res) {
    //Get the API token from the header provided by the front-end fetch request
    let apiToken = req.get('X-API-Token');
    Users.findByToken(apiToken, user => {
      Posts.like(req.query.post_id, user.id, (result) => {
        res.status(200).json(result);
      })
    })
  })

  app.get('/api/postlikecount', function (req, res) {
      Posts.likeCount(req.query.post_id, (result) => {
        res.status(200).json(result);
    })
  })
  
  app.get('/api/comments', (req, res) => {
    let limit = 3
    let offset = req.query.offset

    console.log(offset)

    Comments.getComments(req.query.post_id, (result) => {
      res.json(result)
    })
  })

  app.get('/api/comment', (req, res) => {
    Comments.getComment(req.query.comment_id, (result) => {
      res.json(result)
    })
  })

  app.get('/api/posts', (req, res) => {
    let limit = 3
    let offset = req.query.offset

    console.log(offset)

    Posts.getPosts(offset, limit, (result) => {
      res.json(result)
    })
  })

  app.delete('/api/post', (req, res) => {
    let apiToken = req.get('X-API-Token');
    Users.findByToken(apiToken, user => {
      let post_id = req.query.post_id
      Posts.canUserDeletePost(post_id, user.id, (canDelete) => {
        if (canDelete) {
          Comments.deleteComments(post_id, () =>
            Posts.deletePost(post_id, (result) => {
              console.log("Deleted POST:", result)
              res.status(200).json(result);
            })
          )
        } else {
          res.status(403)
        }
      })
    })
  })

  app.delete('/api/comment', (req, res) => {
    let apiToken = req.get('X-API-Token');
    Users.findByToken(apiToken, user => {
      let comment_id = req.query.comment_id
      Comments.canUserDeleteComment(comment_id, user.id, (canDelete) => {
        if (canDelete) {
          Comments.deleteComment(comment_id, (result) => {
            console.log("Deleted COMMENT:", result)
            res.status(200).json(result);
          })
        } else {
          res.status(403)
        }
      })
    })
  })

  // Tell us where we're running from
  console.log("Server running on http://localhost:" + port)
  app.listen(port)