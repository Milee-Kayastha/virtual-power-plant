<h1 align="center">
Virtual Power Plant
</h1>

## Overview
This project is a virtual power plant system for aggregating distributed power sources into a single cloud-based energy provider. It consists of a frontend built with Next.js for the user interface and a backend built with Node.js for the API server.

## Features
- User-friendly UI for managing batteries and viewing statistics.
- REST API endpoints for battery management and data retrieval.
- MongoDB integration for persistent data storage.

## Tech Stack
- **Frontend**: Next.js, React, Ant Design, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Prerequisites
- MongoDB
- Node
- npm

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Milee-Kayastha/virtual-power-plant.git
   ```

2. **Install dependencies**: 
   ```bash
   cd virtual-power-plant
   ```
    Note: you need client and server runs concurrently in different terminal session, in order to make them communicate with each other.
  
    **Client-side usage(PORT: 3000)**
    ```bash
    $ cd frontend          // go to frontend folder
    $ yarn # or npm i    // npm install packages
    $ npm run dev        // run it locally
    
    ```
  
    **Server-side usage(PORT: 4000)**
     ```bash
    $ cd backend          // go to backend folder
    $ yarn # or npm i    // npm install packages
    
    ```

3. **Set up environment variables**:
   - Create a `.env` file inside the backend folder.
   - Add environment variables. You need to add  MONGO_URL and PORT(optional) in .env to connect to MongoDB


4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: Open your browser and navigate to `http://localhost:3000`.
   - Backend: The backend server will be running on `http://localhost:4000`.
