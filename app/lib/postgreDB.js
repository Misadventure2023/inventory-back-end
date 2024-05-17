/**
 * Load the 'postgres' module to enable connection to a Postgres database
 */
var postgres = require('postgres');

/**
 * Declare an undefined 'pool' variable
 */
var pool;

/**
 * Export a function that returns the pool variable
 */
module.exports = () => {
    /**
     * If pool already has a value, return it.
     */
    if (pool) return pool;

    /** 
     * Notice that the values for the options object of the createPool() function all comes
     * from process.env. Check your .env file. :)
     */
    pool = postgres(process.env.EXTERNAL_DATABASE, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // Increase connection timeout
        connect_timeout: 60,
        // Enable SSL if your database requires it
        ssl: process.env.DB_SSL === 'true',
        // Enable debug mode
        debug: true
    });

    // console.log({
    //     external: process.env.EXTERNAL_DATABASE,
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    //     user: process.env.DB_USER, 
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME
    // });

    /**
     * Return the pool variable
     */
    return pool;
};