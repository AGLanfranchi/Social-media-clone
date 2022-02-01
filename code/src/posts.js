const Database = require('./database.js')
const UUID = require('uuid')
const htmlEscaper = require('html-escaper')

module.exports = {

    insertPost(title, body, user_id, image_id, callback) {
        Database.connect().then(db => {
            // XSS code
            title = htmlEscaper.escape(title)
            body = htmlEscaper.escape(body)
            db.run('INSERT INTO posts("title", "body", "user_id", "image_id") VALUES(?, ?, ?, ?)', title, body, user_id, image_id).then(result => {
                callback()
            })
                .catch(err => {
                    console.log('Post failed with error:' + err)
                })
        })
    },

    imageUpload(filepath, callback) {
        Database.connect().then(db => {
            db.run('INSERT INTO images("filepath") VALUES(?)', filepath).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Image upload failed with error:' + err)
                })
        })
    },

    getPosts(offset, limit, callback) {
        Database.connect().then(db => {
            db.all('SELECT posts.id, posts.title, posts.body, posts.user_id, images.id AS image_id, images.filepath FROM posts LEFT JOIN images ON posts.image_id = images.id ORDER BY posts.id DESC LIMIT ? OFFSET ?', limit, offset).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Get posts failed with error:' + err)
                })
        })
    },

    deletePost(post_id, callback) {
        Database.connect().then(db => {
            db.all('DELETE FROM posts WHERE id = ?', post_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Delete posts failed with error:' + err)
                })
        })
    },

    canUserDeletePost(post_id, user_id, callback) {
        Database.connect().then(db => {
            db.all('SELECT posts.id FROM posts where id = ? AND user_id = ?', post_id, user_id).then(result => {
                return callback(result.length > 0)
            })
                .catch(err => {
                    console.log(err)
                })
        })
    }
}