const sql = require('../../../lib/postgreDB')()

module.exports = { 
    getStocks: async (callback) => {
        let query = `
                SELECT
                    pl.*,
                    cl.category,
                    u.first_name,
                    u.last_name,
                    u.user_name,
                    u.email,
                    u.access_level
                FROM
                    inventory_db_vv52.product_list pl
                JOIN
                    inventory_db_vv52.category_list cl
                ON
                    pl.category = cl.id 
                JOIN
                    inventory_db_vv52.users u
                ON
                    pl.created_by = u.id`

        console.log({query});

        try {
            const result = await sql.unsafe(query);
            // console.log(result);
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    }, 
    createStocks: async (req, res, callback) => {
        const payload = req.body
        let query = `INSERT INTO 
                        inventory_db_vv52.stocks 
                    (
                        product_id,
                        stock,
                        cost,
                        price
                    )
                    VALUES 
                    (
                        ${payload.product_id},
                        ${payload.stock},
                        ${payload.cost},
                        ${payload.price}           
                    )
                    returning *`

        try {
            const result = await sql.unsafe(query);
            console.log('stocks',{result});
            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    deleteStocks: async (id, callback) => {
        let query = `
                DELETE 
                FROM    
                    inventory_db_vv52.product_list 
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
    updateStocks: async (req, res, callback) => {
        const payload = req.body

        console.log(payload);

        let query = `UPDATE 
                        inventory_db_vv52.stocks 
                    SET 
                        stock=${payload.stock}, 
                        cost=${payload.cost}, 
                        price=${payload.price}
                    WHERE 
                        product_id=${payload.id}
                    returning *`    

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
    searchStocks: async (search, callback) => {
        let query = `
            SELECT  
                pl.*,
                cl.category,
                u.first_name,
                u.last_name,
                u.user_name,
                u.email,
                u.access_level
            FROM 
                inventory_db_vv52.product_list pl
            JOIN
                inventory_db_vv52.category_list cl
            ON
                pl.category = cl.id 
            JOIN
                inventory_db_vv52.users u
            ON
                pl.created_by = u.id
            WHERE
                pl.product_name LIKE '%${search}%' OR
                pl.product_description LIKE '%${search}%' OR
                pl.date_created LIKE '%${search}%' OR
                cl.category LIKE '%${search}%' OR
                u.first_name LIKE '%${search}%' OR
                u.last_name LIKE '%${search}%'`
                
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