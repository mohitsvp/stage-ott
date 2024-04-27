# My List Feature - Backend Services

This project provides backend services for the "My List" feature of an OTT platform. It allows users to save their favorite movies and TV shows to a personalized list. The services include adding, removing, and listing saved items.

## Setup and Running the Application

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the application by running `npm start`.

## Running the Tests

Run the tests by executing `npm test`.

## Design Choices

The application is built using TypeScript and Express.js for the backend, and MongoDB for the database. The "My List" feature is implemented with functions for adding and removing items from the user's list, and retrieving all items in the user's list, with pagination implemented for efficient handling of potentially large lists.

The application uses the User model to interact with the user's data in the database. The user's list is stored in the `myList` field of the `User` schema, which is an array of objects, each containing the kind of the item (Movie or TVShow) and the item's unique ID.

The application also includes controllers for managing movies, TV shows, and genres, which are stored in separate collections in the database.

## Assumptions

The application assumes that basic user authentication is in place. For testing purposes, a mock user ID is used.

## Performance and Scalability

The `listMyItems` function uses pagination to efficiently handle potentially large lists. It retrieves only a subset of the user's list at a time, reducing the load on the database and improving response times.

The application uses MongoDB, a NoSQL database, which is designed for scalability and performance. It can handle large amounts of data and high load, making it suitable for an OTT platform with potentially millions of users.

## Integration Tests

Integration tests are provided for each API endpoint, covering both success and error cases. The tests are located in the `__tests__` directory.

## CI/CD Pipeline

The application includes a `package.json` file with scripts for starting the application and running the tests, which can be used in a CI/CD pipeline.

# API Endpoints

The application provides the following API endpoints:

## User List

- **Add to My List**: `POST /my-list/add`
  - Request Body: `{ kind: "Movie" | "TVShow", item: itemId }`
  - Response: `{ message: "Item added to list" }`

- **Remove from My List**: `POST /my-list/remove`
  - Request Body: `{ kind: "Movie" | "TVShow", item: itemId }`
  - Response: `{ message: "Item removed from list" }`

- **List My Items**: `GET /my-list?page={page}&limit={limit}`
  - Response: `{ list: paginatedList }`

## Movies

- **Add Movie**: `POST /movie/add`
  - Request Body: `{ title: string, ... }`
  - Response: `{ message: "Movie added successfully", _id: movieId }`

- **Update Movie**: `PATCH /movie/:id/update`
  - Request Body: `{ title: string, ... }`
  - Response: `{ title: string, ... }`

- **Remove Movie**: `DELETE /movie/:id`
  - Response: `{ message: "Movie removed successfully" }`

- **Get All Movies**: `GET /movie/all`
  - Response: `[ { title: string, ... }, ... ]`

- **Get Movie By ID**: `GET /movie/:id`
  - Response: `{ title: string, ... }`

## TV Shows

- **Add TV Show**: `POST /tvshow/add`
  - Request Body: `{ title: string, ... }`
  - Response: `{ message: "TV Show added successfully", _id: tvShowId }`

- **Update TV Show**: `PATCH /tvshow/:id/update`
  - Request Body: `{ title: string, ... }`
  - Response: `{ title: string, ... }`

- **Remove TV Show**: `DELETE /tvshow/:id`
  - Response: `{ message: "TV Show removed successfully" }`

- **Get All TV Shows**: `GET /tvshow/all`
  - Response: `[ { title: string, ... }, ... ]`

- **Get TV Show By ID**: `GET /tvshow/:id`
  - Response: `{ title: string, ... }`

## Genres

- **Add Genre**: `POST /genre/add`
  - Request Body: `{ name: string }`
  - Response: `{ message: "Genre added successfully", _id: genreId }`

- **Update Genre**: `PATCH /genre/:id`
  - Request Body: `{ name: string }`
  - Response: `{ name: string }`

- **Remove Genre**: `DELETE /genre/:id`
  - Response: `{ message: "Genre removed successfully" }`

- **Get All Genres**: `GET /genre/all`
  - Response: `[ { name: string }, ... ]`


  For more details on the request and response formats, please refer to the API documentation.