const Database = require('./database.js')
const UUID = require('uuid')

module.exports = {

    insertPost(title, body, callback) {
        Database.connect().then(db =>  {
            db.run('INSERT INTO posts("title", "body") VALUES(?, ?)', title, body).then(result => {
                callback()
            })
            .catch(err => {
                console.log('post failed with error:' + err)
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
    }
}