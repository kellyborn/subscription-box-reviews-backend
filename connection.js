const { Pool } = require('pg');
try {
    // When not running via Heroku, this will load the .env file.
    require('dotenv').config();
} catch (e) {
    // When running with Heroku, dotenv doesn't need to be available.
}
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    //this is what made it work 
    //https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});
module.exports = pool;