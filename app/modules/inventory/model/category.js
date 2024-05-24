const sql = require('../../../lib/postgreDB')()

module.exports = { 
    getCategory: async (callback) => {
        let query = `
                    SELECT 
                        cl.*, 
                        u.first_name,
                        u.last_name,
                        u.user_name,
                        u.email,
                        u.access_level
                    FROM 
                        inventory_db_vv52.category_list cl
                    JOIN 
                        inventory_db_vv52.users u
                    ON 
                        cl.created_by = u.id
                        `

        console.log({query});

        try {
            const result = await sql.unsafe(query);
            console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    }, 
    createCategory: async (req, res, callback) => {
        const payload = req.body
        let query = `INSERT INTO 
                        inventory_db_vv52.category_list 
                    (
                        category,
                        status,
                        date_created,
                        date_modified,
                        created_by
                    )
                    VALUES 
                    (
                        '${payload.category}',
                        '${payload.status}',
                        '${payload.date_created}',
                        '${payload.date_modified}',
                        '${payload.created_by}'               
                    )`

        try {
            const result = await sql.unsafe(query);
            console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    deleteCategory: async (id, callback) => {
        let query = `
                DELETE 
                FROM    
                    inventory_db_vv52.category_list 
                WHERE 
                    id=${id}`

        console.log("delete", {query});

        try {
            const result = await sql.unsafe(query);
            console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    updateCategory: async (req, res, callback) => {
        const payload = req.body

        let query = `UPDATE 
                        inventory_db_vv52.category_list 
                    SET 
                        category='${payload.category}', 
                        status=${payload.status},
                        date_modified='${payload.date_modified}' 
                    WHERE 
                        id=${payload.id}`    
        console.log({query});
        try {
            const result = await sql.unsafe(query);
            console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    searchCategory: async (search, callback) => {
        let query = `SELECT  
                cl.*,
                u.first_name,
                u.last_name,
                u.user_name,
                u.email,
                u.access_level,
                u.date_created,
                u.status
            FROM 
                inventory_db_vv52.category_list cl
            JOIN
                inventory_db_vv52.users u
            ON
                cl.created_by = u.id
            WHERE
                cl.category LIKE '%${search}%' OR
                CAST(cl.status AS TEXT) LIKE '%${search}%' OR
                cl.date_created LIKE '%${search}%' OR
                cl.date_modified LIKE '%${search}%' OR
                CAST(cl.created_by AS TEXT) LIKE '%${search}%'`
                
        // let query = `SELECT 
        //                 cl.*, 
        //                 u.first_name,
        //                 u.last_name,
        //                 u.user_name,
        //                 u.email,
        //                 u.access_level,
        //                 u.date_created,
        //                 u.status
        //             FROM 
        //                 inventory_db_vv52.category_list cl
        //             JOIN 
        //                 inventory_db_vv52.users u
        //             ON 
        //                 cl.created_by = u.id
        //             WHERE
        //                 cl.category LIKE '%${search}%' OR
        //                 CAST(cl.status AS TEXT) LIKE '%${search}%' OR
        //                 cl.date_created LIKE '%${search}%' OR
        //                 cl.date_modified LIKE '%${search}%' OR
        //                 CAST(cl.created_by AS TEXT) LIKE '%${search}%'`
        try {
            const result = await sql.unsafe(query);
            console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    }
}