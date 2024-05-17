
const sql = require('../lib/postgreDB')()

module.exports = async (query, callback) => {
    try {
        const result = await sql.unsafe(query);
        console.log(result);
        callback(result, null);
    } catch (err) {
        console.error(err);
        callback(null, err);
    }

}