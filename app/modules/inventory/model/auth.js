const sql = require('../../../lib/postgreDB')()

module.exports = { 
    login: async (userInput, callback) => {
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