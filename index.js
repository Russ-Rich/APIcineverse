import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import {v4 as uuidv4} from 'uuid';
import Joi from 'joi';
import {createLogger, format, transports} from 'winston';

dotenv.config();
const app = express();

// Setup Winston Logger
const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    new transports.File({filename: 'error.log', level: 'error'}),
    new transports.File({filename: 'combined.log'}),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public')); 

// Defines Joi schemas
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().required(),
});

const userUpdateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
}).min(1); 

// In-memory data structure
const users = {};

// Movie Endpoints
app.get('/movies', (req, res) => {
  res.json({message: 'JSON array of all movies'});
});

app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  res.json({message: `JSON object with details of the movie titled: ${title}`});
});

app.get('/genres/:name', (req, res) => {
  const {name} = req.params;
  res.json({
    message: `JSON object with description of the genre named: ${name}`,
  });
});

app.get('/directors/:name', (req, res) => {
  const {name} = req.params;
  res.json({
    message: `JSON object with details of the director named: ${name}`,
  });
});

// User Endpoints
app.post('/users', (req, res) => {
  const {error, value} = userRegistrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const userId = uuidv4();
  res.json({
    message: 'JSON object confirming registration',
    userId,
    userDetails: value,
  });
});

app.put('/users/:username', (req, res) => {
  const {error, value} = userUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const {username} = req.params;
  res.json({
    message: `JSON object confirming update of the user with username: ${username}`,
    updatedDetails: value,
  });
});

app.post('/users/:username/favorites', (req, res) => {
  const {username} = req.params;
  const movie = req.body.movie;

  if (!users[username]) {
    users[username] = {favorites: []};
  }

  users[username].favorites.push(movie);
  res.send(`Movie has been added to ${username}'s list of favorites`);
});

app.delete('/users/:username/favorites/:movieID', (req, res) => {
  const {username, movieID} = req.params;

  if (users[username]) {
    users[username].favorites = users[username].favorites.filter(
      (movie) => movie.id !== movieID
    );
    res.send(`Movie has been removed from ${username}'s list of favorites`);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:username', (req, res) => {
  const {username} = req.params;

  if (users[username]) {
    delete users[username];
    res.send(`User ${username}'s email has been removed`);
  } else {
    res.status(404).send('User not found');
  }
});

// Setting up the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
