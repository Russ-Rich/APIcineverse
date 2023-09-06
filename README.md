# APIcineverse

## Description

APIcineverse is a RESTful API that provides access to a database of movies. The API offers endpoints for getting information about movies, genres, directors, and users. It also allows users to register, update their information, and manage their favorite movies.

## Installation

To install APIcineverse, clone the repository and install the dependencies.

```
git clone https://github.com/Russ-Rich/APIcineverse.git
cd APIcineverse
npm install
```

## Usage

To start the API, run the following command:

```
npm start
```

The API will be available at <http://localhost:3000>.

## Endpoints

The following endpoints are available:

- `/movies`: Get a list of all movies.
- `/movies/:title`: Get detailed information about a specific movie.
- `/genres/:name`: Get details about a specific genre.
- `/directors/:name`: Get details about a specific director.
- `/users`: Register a new user.
- `/users/:username`: Update details of a specific user.
- `/users/:username/favorites`: Add a movie to a user's favorites list.
- `/users/:username/favorites/:movieID`: Remove a movie from a user's favorites list.
- `/users/:username`: Delete a user's account.

## Authentication

The API uses JSON Web Tokens (JWTs) for authentication. To obtain a JWT, you must first register a user. Once you have registered a user, you can use the `/users/login` endpoint to obtain a JWT. The JWT will be returned in the response body.

To use the API, you must include the JWT in the Authorization header of your requests. For example:

```
Authorization: Bearer <JWT>
```

## Error Handling

The API uses a consistent error handling mechanism. All errors are returned in the response body in the following format:

```
{
  "error": {
    "code": <error code>,
    "message": <error message>
  }
}
```

The following error codes are defined:

- `400`: Bad request.
- `401`: Unauthorized.
- `403`: Forbidden.
- `404`: Not found.
- `500`: Internal server error.
