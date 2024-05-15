
const db = require('../../../lib/database')()
const config = require('../config/config')
const mysql = require('mysql2/promise');

module.exports = { 
    getCategory: (callback) => {
        let query = `SELECT * FROM category_list`
            
        db.query(query, (err, result) => { //excecute query
            if (err) return callback("", err)
            
            return callback(result, "")
        })
    }, 
    createCategory: (req, res, callback) => {
        const payload = req.body
        let query = `INSERT INTO 
                        category_list 
                    VALUES 
                    (
                        NULL,
                        '${payload.category}',
                        '${payload.status}',
                        '${payload.dateCreated}',
                        '${payload.createdBy}',
                        '1'                        
                    )`
                    
        db.query(query, (err, result) => { //excecute query
            if (err) return callback("", err)

            return callback(result, "")
        })
    },
    deleteCategory: (id, callback) => {
        let query = `DELETE from category_list WHERE id="${id}"`

        db.query(query, (err, result) => {
            if (err) return callback("", err)

            return callback(result, err)
        })
    },
    updateCategory: (req, res, callback) => {
        
        async function updateCategory() {
            const connection = await mysql.createConnection(config.db); //create Db Connection
            await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
            await connection.beginTransaction(); // Start all query    
            try {
                let row = [ //rows use for query values
                    req.body.category,
                    req.body.status,
                    req.body.id
                ]

                let query = `UPDATE category_list SET category=?, status=? WHERE id=?`    
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
            await updateCategory()
        })();
    },
    searchCategory: (search, callback) => {
        
        let query = `SELECT 
                        *
                    FROM 
                        category_list
                    WHERE
                        category='${search}' OR
                        status='${search}' OR
                        date_created='${search}' OR
                        created_by='${search}'
                    `
            
        db.query(query, (err, result) => { //excecute query
            if (err) return callback("", err)
            
            return callback(result, "")
        })
    }
}