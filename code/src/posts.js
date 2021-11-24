const Database = require('./database.js')
const UUID = require('uuid')

module.exports = {

    insertPost(title, body, callback) {
    Database.connect().then(db => {
        
        db.run('INSERT INTO posts("title", "body") VALUES(?, ?)', title, body).then(result => {

            callback()
        })
        .catch(err => {
            console.log('post failed ith error:' + err)
            })
        })
    }
}