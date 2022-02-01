const Database = require('./database.js')
const UUID = require('uuid')
const htmlEscaper = require('html-escaper')

module.exports = {
    getComment(comment_id, callback) {
        Database.connect().then(db => {
            db.all('SELECT * FROM comments WHERE id = ? ORDER BY id ASC', comment_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Get comments failed with error:' + err)
                })
        })
    },

    getComments(post_id, callback) {
        Database.connect().then(db => {
            db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', post_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Get comments failed with error:' + err)
                })
        })
    },

    insertComment(body, post_id, user_id, callback) {
        Database.connect().then(db => {
            // XSS code
            body = htmlEscaper.escape(body)
            db.run('INSERT INTO comments("body", "post_id", "user_id") VALUES(?, ?, ?)', body, post_id, user_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Post comments failed with error:' + err)
                })
        })
    },

    deleteComments(post_id, callback) {
        Database.connect().then(db => {
            db.all('DELETE FROM comments WHERE post_id = ?', post_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Delete comments failed with error:' + err)
                })
        })
    },

    deleteComment(comment_id, callback) {
        Database.connect().then(db => {
            db.all('DELETE FROM comments WHERE id = ?', comment_id).then(result => {
                callback(result)
            })
                .catch(err => {
                    console.log('Delete comment failed with error:' + err)
                })
        })
    },

    canUserDeleteComment(comment_id, user_id, callback) {
        Database.connect().then(db => {
            db.all('SELECT comments.id FROM comments where id = ? AND user_id = ?', comment_id, user_id).then(result => {
                return callback(result.length > 0)
            })
                .catch(err => {
                    console.log(err)
                })
        })
    }

}
