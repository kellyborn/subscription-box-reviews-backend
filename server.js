// require the Express module
const express = require("express");

// require the Cors module
const cors = require("cors");

//require the router object (and all it's defined routes) to be used in this file
const { routes } = require("./routes");

// creates an Express application - allows us to create and and use APIs
const app = express();

// Enable CORS so that this can be used from web-apps on other domains.
app.use(cors());

// Allow JSON request bodies for PUT and POST
app.use(express.json());

//use the the router object (and all it's defined routes)
app.use("/", routes);

// define the port
const DEFAULT_PORT = 3000;
// Use Heroku's PORT or default to 3000.
const port = process.env.PORT || DEFAULT_PORT;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));