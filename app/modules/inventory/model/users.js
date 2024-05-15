
const db = require('../../../lib/database')()
const config = require('../config/config')
const mysql = require('mysql2/promise');

module.exports = { 
    getUsers: (callback) => {
        let query = `SELECT id, first_name, last_name, user_name, email, date_created, access_level, status FROM users`
            
        db.query(query, (err, result) => { //excecute query
            if (err) return callback("", err)
            
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
            if (err) return callback("", err)

            return callback(result, "")
        })
    },
    deleteUser: (id, callback) => {
        let query = `DELETE from users WHERE id="${id}"`

        db.query(query, (err, result) => {
            if (err) return callback("", err)

            return callback(result, err)
        })
    },
    updateUser: (req, res, callback) => {
        
        async function updateUser() {
            const connection = await mysql.createConnection(config.db);//create Db Connection
            await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
            await connection.beginTransaction(); // Start all query    
            try {
                let query;
                let row = [ //rows use for query values
                    req.body.first_name,
                    req.body.last_name,
                    req.body.user_name,
                    req.body.email,
                    req.body.access_level,
                    req.body.id
                ]

                query = `UPDATE users SET first_name=?, last_name=?, user_name=?, email=?, access_level=? WHERE id=?`    
                await connection.execute(
                    query,
                    row
                )

                //Execute All Queries
                await connection.commit();
                //close Connection
                connection.end()
                // // return product_id to callback
                callback("Status: Success", "")
            } catch (err) {
                console.error(`Error occurred while Updating user: ${err.message}`, err);
                //Disregard all inserted rows in case of error
                connection.rollback();
                callback("Error on Uploading", err.message)
            }
        }
        (async function addExecute() {
            await updateUser()
        })();
    },
    searchUser: (search, callback) => {
        
        let query = `SELECT 
                        id, 
                        first_name, 
                        last_name, 
                        user_name, 
                        email, 
                        access_level, 
                        status 
                    FROM 
                        users
                    WHERE
                        first_name LIKE '%${search}%' OR
                        last_name LIKE '%${search}%' OR
                        user_name LIKE '%${search}%' OR
                        email LIKE '%${search}%' OR
                        date_created LIKE '%${search}%' OR
                        access_level LIKE '%${search}%'
                    `
            
        db.query(query, (err, result) => { //excecute query
            if (err) return callback("", err)
            
            return callback(result, "")
        })
    }
}