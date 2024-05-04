
const db = require('../../../lib/database')()

module.exports = { 
    getUsers: (callback) => {
        let query = `SELECT id, first_name, last_name, user_name, email, access_level, status FROM users`
            
        db.query(query, (err, result) => { //excecute query
                //callback an error
            if (err) return callback("", err)
            
            //callback result match found and log in
            return callback(result, "")
        })
    }, 
    createUser: (payload, req, res, callback) => {
        let query = `INSERT INTO 
                        users 
                    VALUES 
                    (
                        NULL,
                        '${payload.firstName}',
                        '${payload.lastName}',
                        '${payload.userName}',
                        '${payload.email}',
                        '${payload.password}',
                        '${payload.dateCreated}',
                        '${payload.accessLevel}',
                        '1'                        
                    )`
                    
        db.query(query, (err, result) => { //excecute query
            if (err) {
                //callback an error
                callback("", err)
            } else {
                //callback result match found and log in
                callback(result, "")
            }
        })
    },
    deleteUser: (id, callback) => {
        let query = `DELETE from users WHERE id="${id}"`

        db.query(query, (err, result) => {
            if (err) return callback("", err)

            return callback(result, err)
        })
    }
}