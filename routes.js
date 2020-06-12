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

routes.post("/home", (req, res) => {
    pool.query("INSERT INTO reviews(review, rating, subscription_id, review_title, user_cost ) VALUES ($1::text, $2::int, $3::int, $4::text, $5::money )",
        [req.body.review, req.body.rating, req.body.subscription_id, req.body.review_title, req.body.user_cost]).then(() => {
            res.json(req.body)
        });
});


module.exports = { routes };