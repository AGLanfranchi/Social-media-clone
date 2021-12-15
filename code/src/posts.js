const Database = require('./database.js')
const UUID = require('uuid')

module.exports = {

    insertPost(title, body, user_id, callback) {
        Database.connect().then(db =>  {
            db.run('INSERT INTO posts("title", "body", "user_id") VALUES(?, ?, ?)', title, body, user_id).then(result => {
                callback()
            })
            .catch(err => {
                console.log('Post failed with error:' + err)
            })
        })
    },

    getPosts(offset, limit, callback) {
        Database.connect().then(db =>  {
            db.all('SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?', limit, offset).then(result => {
                callback(result)
            })
            .catch(err => {
                console.log('Get posts failed with error:' + err)
            })
        })
    },

    imageUpload(filepath, callback) {
        Database.connect().then(db =>  {
            db.run('INSERT INTO images("filepath") VALUES(?)', id, filepath).then(result => {
                callback()
            })
            .catch(err => {
                console.log('Image upload failed with error:' + err)
            })
        })
    }
}