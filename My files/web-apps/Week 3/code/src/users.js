const UUID = require('uuid')
const Database = require('./src/database.js')



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
        DB.connect().then(db => {
            
            
            
            db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
                if (result) {
                    
                    callback(result)
                }
            })
            .catch(err => {
                console.log('users.login failed with error:' + err)
            })
        })
    },

    findByToken(token) {
        DB.connect().then(db => {
            db.get('SELECT * FROM users WHERE token = ?', token).then(result => {
                callback(result)
            })
            .catch(err => {
                console.log('users.findByToken failed with error:' + err)
            })
        })
    }

}
