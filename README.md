# Movies_API
## Overview
Movies_API is a project of creating and studying API, using mongoDB and building a front-end to show the movies that have been created. Development using TypeScript, NodeJS Express.js, Prisma, and D3.js library for data visualization. The project focuses on creating a RESTful API for managing movies, users, and user reviews using HTTP methods.

## Technologies Used
- **Backend**: Node.js with Express.js framework
- **Database**: Prisma for ORM (Object-Relational Mapping) with PostgreSQL
- **Frontend**: D3.js library for data visualization
- **Other**: TypeScript for type safety and improved developer experience

## Features
- **Movie Management**: CRUD operations for managing movies.
- **User Management**: CRUD operations for managing users.
- **Reviews**: Users can submit reviews for movies.

## Installation
To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Vini-Pedroso/Movies_API.git`
2. Navigate to the project directory: `cd Movies_API`
3. Install dependencies: `npm install`
4. Set up environment variables: Copy `.env.example` to `.env` and configure database connection details.
5. Run migrations: `npx prisma migrate dev`
6. Start the server: `npm start`

## Usage
To interact with the API, you can use tools like Postman or curl. Here are some example requests:

- Get all movies: `GET /api/movies`
- Add a new movie: `POST /api/movies`
- Get user information: `GET /api/users/:userId`
- Add a movie review: `POST /api/reviews`

## Data Visualization
This project utilizes D3.js for visualizing user reviews of movies. You can explore user reviews through the interactive visualization on the frontend.

## Contributing
Contributions are welcome! If you want to contribute to this project, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
