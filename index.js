const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Morgan middleware for logging
app.use(morgan('dev'));

// Serve static files from 'public' folder
app.use(express.static('public'));

// GET route for '/movies'
app.get('/movies', (req, res) => {
  res.json({
    top20RecentMovies: [
      'Dune',
      'No Time to Die',
      'Spider-Man: No Way Home',
      'Black Widow',
      'A Quiet Place Part',
      'The French Dispatch',
      'The Suicide Squad',
      'Shang-Chi and the Legend of the Ten Rings',
      "Don't Look Up",
      'Cruella',
      'The Batman',
      'Uncharted',
      'Black Panther: Wakanda Forever',
      'The Flash',
      'Avatar: The Way of Water',
      'Jurassic World: Dominion',
      'The Marvels',
      'Turning Red',
      'Sonic the Hedgehog 2',
      'Doctor Strange in the Multiverse of Madness',
    ],
  });
});

// GET route for '/'
app.get('/', (req, res) => {
  res.send('Hello World, movie API party in the city!');
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
