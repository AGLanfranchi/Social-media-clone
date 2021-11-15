const Database = require('./database.js')
const UUID = require('uuid')



module.exports = {

    test(){
        Database.connect().then(Database.connect().then(db =>{
            console.log(db)
          
            db.get('SELECT * FROM users').then(result =>{
              console.log(result)
            })
          }))
    },
    
    login(username, password, callback) {
        Database.connect().then(db => {
            
            
            
            db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
                // if (result) {
                    
                    callback(result)
                // }
            })
            .catch(err => {
                console.log('users.login failed with error:' + err)
            })
        })
    },

    findByToken(token) {
        Database.connect().then(db => {
            db.get('SELECT * FROM users WHERE token = ?', token).then(result => {
                callback(result)
            })
            .catch(err => {
                console.log('users.findByToken failed with error:' + err)
            })
        })
    }

}
