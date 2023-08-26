# APIcineverse

APIcineverse is a tool for developers to easily access and work with movie data. It offers straightforward ways to search, sort, and manage a big collection of films.

## Quick Recap - Updated on 2023-08-26

1. **`documentation.html`**: Created and added initial instructions for API usage.

2. **`server.js`**:

    - Imports essential Node.js modules: `http`, `fs`, `url`, and `path`.
    - Handles incoming requests based on URL paths and listens on port 8080.

3. **`log.txt`**: A log file where all incoming HTTP requests, including the request URL and timestamp, are stored.

---

### To test setup

- Run `node server.js` in the terminal.
- Open a web browser and navigate to `http://localhost:8080/` and `http://localhost:8080/documentation`.
- Validate logs in `log.txt` file.
