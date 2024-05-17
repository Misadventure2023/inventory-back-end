const sql = require('../../../lib/postgreDB')()

module.exports = { 
    getUsers: async (callback) => {
        let query = `SELECT id, first_name, last_name, user_name, email, date_created, access_level, status FROM inventory_db_vv52.users`

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
    createUser: async (payload, req, res, callback) => {
        let query = `
                INSERT INTO 
                    inventory_db_vv52.users 
                    (
                        "first_name", 
                        "last_name", 
                        "user_name", 
                        "email", 
                        "password", 
                        "date_created", 
                        "access_level", 
                        "status"
                    )
                VALUES 
                    (
                        '${payload.first_name}',
                        '${payload.last_name}',
                        '${payload.user_name}',
                        '${payload.email}',
                        '${payload.password}',
                        '${payload.date_created}',
                        '${payload.access_level}',
                        1                        
                    )`

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
    deleteUser: async (id, callback) => {
        let query = `DELETE FROM inventory_db_vv52.users WHERE id=${id}`

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
    updateUser: async (req, res, callback) => {
        const payload = req.body
        const query = `
            UPDATE 
            inventory_db_vv52.users 
            SET
                first_name='${payload.first_name}', 
                last_name='${payload.last_name}', 
                user_name='${payload.user_name}', 
                email='${payload.email}',
                access_level='${payload.access_level}',
                status=${payload.status}
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
    searchUser: async (search, callback) => {
        
        let query = `SELECT 
                        id, 
                        first_name, 
                        last_name, 
                        user_name, 
                        email, 
                        access_level, 
                        status 
                    FROM 
                        inventory_db_vv52.users
                    WHERE
                        first_name LIKE '%${search}%' OR
                        last_name LIKE '%${search}%' OR
                        user_name LIKE '%${search}%' OR
                        email LIKE '%${search}%' OR
                        date_created LIKE '%${search}%' OR
                        access_level LIKE '%${search}%'
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
    }
}