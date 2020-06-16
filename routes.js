// require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();

// step 4 - make instance
const pool = require("./connection");


routes.get("/subscriptions", (request, response) => {
    pool.query("SELECT * FROM subs").then((result) => {
        response.json(result.rows);
    });
});

routes.get("/reviews", (request, response) => {
    pool.query("SELECT * FROM reviews").then((result) => {
        response.json(result.rows);
    });
});

//GET meat featured reviews
routes.get("/meatfeaturedreviews", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'meat'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});

routes.get("/meatsubs", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'meat'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});

routes.get("/vegsubs", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'veg'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});

routes.get("/mealprep", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'mealprep'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});




//GET veggie featured reviews

routes.get("/vegfeaturedreviews", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'veg'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});


//GET meal prep featured reviews
routes.get("/mealprepfeaturedreviews", (request, response) => {
    pool.query("SELECT * FROM reviews JOIN subs ON reviews.subscription_id = subs.sub_id WHERE sub_type = 'mealprep'").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    });
});


routes.post("/home", (req, res) => {
    pool.query("INSERT INTO reviews(review, rating, subscription_id, review_title, user_cost ) VALUES ($1::text, $2::int, $3::int, $4::text, $5::money )",
        [req.body.review, req.body.rating, req.body.subscription_id, req.body.review_title, req.body.user_cost]).then(() => {
            res.json(req.body)
        });
});



module.exports = { routes };