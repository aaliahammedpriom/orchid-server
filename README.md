# Orchid Movie Server

## Overview
The Orchid Movie Server is a Node.js and Express-based backend application that provides a RESTful API for managing movies, users, and favorite movies. The server connects to a MongoDB database for data persistence.

## Features
- **Movies**
  - Read all movies
  - Read a specific movie by ID
  - Add a new movie
  - Edit an existing movie
  - Delete a movie

- **Users**
  - Retrieve all users
  - Add a new user

- **Favorite Movies**
  - Retrieve favorite movies
  - Add a favorite movie
  - Remove a favorite movie

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Middleware**: CORS, dotenv

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=4000
   user_DB=<your_mongodb_username>
   user_Pass=<your_mongodb_password>
   ```

4. Start the server:
   ```bash
   node server.js
   ```
   The server will run on the specified `PORT` (default: 4000).

## API Endpoints

### Movies

1. **Get all movies**
   ```http
   GET /movies
   ```

2. **Get a movie by ID**
   ```http
   GET /movies/:id
   ```

3. **Add a movie**
   ```http
   POST /movies
   Content-Type: application/json
   Body: {
     "title": "string",
     "poster": "string",
     "duration": "string",
     "release_year": "number",
     "genre": "string",
     "ratingValue": "number",
     "summary": "string"
   }
   ```

4. **Update a movie**
   ```http
   PUT /movies/:id
   Content-Type: application/json
   Body: { ...updated movie fields }
   ```

5. **Delete a movie**
   ```http
   DELETE /movies/:id
   ```

### Users

1. **Get all users**
   ```http
   GET /users
   ```

2. **Add a user**
   ```http
   POST /users
   Content-Type: application/json
   Body: {
     "name": "string",
     "email": "string"
   }
   ```

### Favorite Movies

1. **Get all favorite movies**
   ```http
   GET /favorite
   ```

2. **Add a favorite movie**
   ```http
   POST /favorite
   Content-Type: application/json
   Body: {
     "userId": "string",
     "movieId": "string"
   }
   ```

3. **Remove a favorite movie**
   ```http
   DELETE /favorite/:id
   ```

## Notes
- Ensure your MongoDB database credentials are correct in the `.env` file.
- Uncomment `await client.connect();` in the `run()` function to enable persistent MongoDB connection.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

