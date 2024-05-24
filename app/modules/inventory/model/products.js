const sql = require('../../../lib/postgreDB')()
const stocks = require('./stocks');
const model = require('./stocks')

module.exports = { 
    getProduct: async (callback) => {
        let query = `
                SELECT
                    pl.*,
                    s.stock,
                    s.price,
                    s.cost,
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
                    inventory_db_vv52.stocks s
                ON
                    s.product_id = pl.id
                JOIN
                    inventory_db_vv52.users u
                ON
                    pl.created_by = u.id`

        // console.log({query});

        try {
            const result = await sql.unsafe(query);

            // console.log({result});

            callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    }, 
    createProduct: async (req, res, callback) => {
        const payload = req.body
        let query = `INSERT INTO 
                        inventory_db_vv52.product_list 
                    (
                        product_name,
                        product_description,
                        option,
                        category,
                        status,
                        date_created,
                        date_modified,
                        created_by
                    )
                    VALUES 
                    (
                        '${payload.product_name}',
                        '${payload.product_description}',
                        '${payload.option}',
                        '${payload.category}',
                        '${payload.status}',
                        '${payload.date_created}',
                        '${payload.date_modified}',
                        '${payload.created_by}'               
                    )
                    returning *`

        try {
            const result = await sql.unsafe(query);
            console.log('create', { result });
            
            const stocksPayload = {
                body: {
                    product_id: result[0].id,
                    ...payload
                }
            }
            model.createStocks(stocksPayload, res, (result, err) => {

                console.log('stock', result);
                if (err) return callback(null, err) 
                callback(result, null)
            })

            
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    deleteProduct: async (id, callback) => {
        let query = `
            DELETE 
            FROM    
                inventory_db_vv52.product_list 
            WHERE 
                id=${id};
            
            DELETE 
            FROM    
                inventory_db_vv52.stocks 
            WHERE 
                product_id=${id};
            `

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
    updateProduct: async (req, res, callback) => {
        const payload = req.body

        let query = `UPDATE 
                        inventory_db_vv52.product_list 
                    SET 
                        product_name='${payload.product_name}', 
                        product_description='${payload.product_description}', 
                        option='${payload.option}', 
                        category='${payload.category}', 
                        status=${payload.status},
                        date_modified='${payload.date_modified}' 
                    WHERE 
                        id=${payload.id}
                    returning *`    

        console.log({query});

        try {
            const result = await sql.unsafe(query);
            

            model.updateStocks(req, res, (result, err) => {

                if (err) return callback(null, err) 
                callback(result, null)
            })

            // callback(result, null);
        } catch (err) {
            console.error(err);
            callback(null, err);
        }
    },
    searchProduct: async (search, callback) => {
        let query = `
            SELECT  
                pl.*,
                s.stock,
                s.price,
                s.cost,
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
                inventory_db_vv52.stocks s
            ON
                s.product_id = pl.id
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