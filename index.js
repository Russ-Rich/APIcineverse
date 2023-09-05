const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Morgan middleware for logging
app.use(morgan('dev'));

// Serve static files from 'public' folder
app.use(express.static('public'));

// GET route for '/'
app.get('/', (req, res) => {
  res.send('Hello World, movie API party in the city!');
});

// GET route for '/movies' to return a list of all movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data on all the movies');
});

// GET route to return data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send(
    `Successful GET request returning data on the movie titled: ${req.params.title}`
  );
});

// GET route to return data about a genre by name/title
app.get('/genres/:name', (req, res) => {
  res.send(
    `Successful GET request returning description of the genre named: ${req.params.name}`
  );
});

// GET route to return data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send(
    `Successful GET request returning data on the director named: ${req.params.name}`
  );
});

// POST route to allow new users to register
app.post('/users', (req, res) => {
  res.send('Successful POST request allowing a new user to register');
});

// PUT route to allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
  res.send(
    `Successful PUT request allowing user ${req.params.username} to update their information`
  );
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
