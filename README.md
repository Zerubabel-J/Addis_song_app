# Music App

A full-stack music application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to manage song information, view statistics, and interact with song data through a responsive user interface.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete songs.
- **Statistics**: View statistics about songs, artists, albums, and genres.
- **Responsive Design**: Mobile-friendly and desktop-compatible user interface.
- **API Integration**: Backend API for song management and statistics.
- **Real-Time Updates**: Dynamic updates without page reloads.

## Technologies

- **Frontend**:

  - React.js with Vite
  - Redux Toolkit and Redux-Saga for state management
  - Emotion and Styled-System for styling
  - React Hook Form and Zod for form handling and validation
  - Chart.js for data visualization

- **Backend**:

  - Express.js for building the REST API
  - MongoDB and Mongoose for database management
  - Deployed on Render or Yegarahost

- **Development Tools**:
  - Node.js
  - npm for package management

## Setup

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Zerubabel-J/Addis_song_app.git
   cd Addis_song_app/server
   Install Dependencies:
   ```

npm install
Create a .env File: Create a .env file in the server directory and add your MongoDB connection URI:

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000

Start the Server:
npm run dev

Frontend Setup
Navigate to the Frontend Directory:
cd ../client
npm install

Create a .env File: Create a .env file in the client directory and add your backend API URL:
VITE_API_URL=http://localhost:5000/api

Start the Development Server:
npm run dev

Usage
Frontend:

Navigate to http://localhost:3000 in your web browser.
You can view and manage songs, and see statistics about them.
Backend:

API endpoints are available at http://localhost:5000/api.

Deployment
Backend
Build and Deploy:

Make sure the .env file on your deployed server has the correct MongoDB URI.
Frontend
Build and Deploy:

Build the React application using Vite
npm run build

Deploy the build directory to Vercel.
Update .env:

Ensure the VITE_API_URL in the .env file points to the deployed backend URL.

API Endpoints
Create a Song:

POST /api/songs
Request Body: { title, artist, album, genre }
Get All Songs:

GET /api/songs
Update a Song:

PUT /api/songs/:id
Request Body: { title, artist, album, genre }
Delete a Song:

DELETE /api/songs/:id
Get Statistics:

GET /api/statistics

Contributing
Feel free to fork the repository and submit pull requests. For significant changes, please open an issue first to discuss the proposed changes.
