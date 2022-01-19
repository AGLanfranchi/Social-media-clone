const Database = require('./database.js')
const UUID = require('uuid')
const htmlEscaper = require('html-escaper')

module.exports = {

    getComments(callback) {
        Database.connect().then(db =>  {
            db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC').then(result => {
                callback(result)
            })
            .catch(err => {
                console.log('Get comments failed to get with error:' + err)
            })
        })
    },

    insertComments(id, body, post_id, user_id, callback) {
        Database.connect().then(db =>  {
            // XSS code. Need to install html-escaper npm
            // title = htmlEscaper.escape(title)
            // body = htmlEscaper.escape(body)
            db.run('INSERT INTO posts("id", "body", "post_id", "user_id") VALUES(?, ?, ?, ?)', id, body, post_id, user_id).then(result => {
                callback()
            })
            .catch(err => {
                console.log('Comments failed to post with error:' + err)
            })
        })
    }

}
