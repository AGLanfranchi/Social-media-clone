const Database = require('./database.js')
const UUID = require('uuid')

module.exports = {

    getComments(callback) {
        Database.connect().then(db =>  {
            db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC').then(result => {
                callback(result)
            })
            .catch(err => {
                console.log('Get comments failed with error:' + err)
            })
        })
    }

    insertComments(id, body, post_id, user_id, callback) {
        Database.connect().then(db =>  {
            // XSS code. Need to install html-escaper npm
            // title = htmlEscaper.escape(title)
            // body = htmlEscaper.escape(body)
            db.run('INSERT INTO posts("title", "body", "user_id", "image_id") VALUES(?, ?, ?, ?)', title, body, user_id, image_id).then(result => {
                callback()
            })
            .catch(err => {
                console.log('Post failed with error:' + err)
            })
        })
    },

}
