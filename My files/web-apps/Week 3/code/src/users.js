const UUID = require('uuid')

module.exports = {
    
    login(username, password, callback) {
        DB.connect().then(db => {
            // UNSAFE! Open to SQL injection attacks
            // See: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html#primary-defenses
            db.get('SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"').then(result => {
            // SAFE
            // db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
                if (result && !result.token) {
                    
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
