// require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();

// step 4 - make instance
const pool = require("./connection");


routes.get("/home", (request, response) => {
    pool.query("SELECT * FROM subs").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    })
});



module.exports = { routes };