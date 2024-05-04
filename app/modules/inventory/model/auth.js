const db = require('../../../lib/database')()

module.exports = { 
    login: (userInput, callback) => {
        let query = `
            SELECT 
                *
            FROM 
                users
            WHERE 
                user_name="${userInput.username}"
            AND 
                password="${userInput.password}"
            AND
                status=1
            `
            
        db.query(query, (err, result) => { //excecute query
            if (err) {
                //callback an error
                callback("", err)
            } else {
                //callback result match found and log in
                callback(result, "")
            }
        })
    } 
}