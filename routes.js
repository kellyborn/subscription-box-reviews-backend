// require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();

// step 4 - make instance
const pool = require("./connection");


//GET subs  table data
routes.get("/subscriptions", (request, response) => {
    pool.query("SELECT * FROM subs").then((result) => {
        response.json(result.rows);
    });
});

//GET review table data
routes.get("/reviews", (request, response) => {
    pool.query("SELECT * FROM reviews").then((result) => {
        response.json(result.rows);
    });
});

//GET subscription DETAILS
routes.get("/subscriptiondetails", (request, response) => {
    const id = parseInt(request.query.id);
    pool.query(`SELECT * FROM reviews FULL JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_id = ${id}`).then((result) => {
        response.json(result.rows);
    });
});

//TODO: Remove these three below and make the above three more generic to use more widely in our front end

// GET subscriptions with type (query params)
routes.get("/subscription", (request, response) => {
    pool.query(`SELECT * FROM reviews FULL JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = '${request.query.type}'`).then((result) => {
        response.json(result.rows);
    });
});

routes.post("/home", (req, res) => {
    console.log(req.body);
    pool.query("INSERT INTO reviews(review, rating, subscription_id, review_title, user_cost ) VALUES ($1::text, $2::int, $3::int, $4::text, $5::money )",
        [req.body.review, req.body.rating, req.body.subscription_id, req.body.review_title, req.body.user_cost]).then(() => {
            res.json(req.body)
        });
});

module.exports = { routes };