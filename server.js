const express = require('express');
const path = require('path');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());


// to serve from the production 'build' folder

app.use(express.static(path.join(__dirname, 'build')));

//middleware to check and verify  a jwt and
//assign user object from the jwt to req.user
app.use(require('./config/checkToken'));
 

const port = process.env.PORT || 3001;


const postRoutes = require("./routes/api/postRoutes");

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use("/api/post", postRoutes); 


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
