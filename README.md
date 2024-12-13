# Santa's Gifts List Application

## Overview
This project is a fully functional gifts list application built using React Native for the frontend and Node.js with Redis for the backend. The application allows users to manage gift items by adding, editing, deleting, saving, restoring, and clearing them. It demonstrates seamless integration between modern frontend and backend technologies.

## Key Features
- **Add Gifts:** Enter a new gift and add it to the list.
- **Edit Gifts:** Modify an existing gift with ease.
- **Delete Gifts:** Remove gifts you no longer need.
- **Save Gifts:** Persist your gift list to a Redis database.
- **Restore Gifts:** Retrieve gifts saved in the Redis database.
- **Clear Gifts:** Empty the list both locally and on the server.

## How It Works

### Backend
The backend is implemented using **Node.js** and **Redis**:
- **Redis Database:** Used to store the list of gifts. The connection to Redis is configured using an environment variable for flexibility and security.
- **Express Routes:** Three main routes are exposed:
  - `GET /load`: Retrieves the gift list items from Redis and returns them as a JSON array.
  - `POST /save`: Replaces the current gift list in Redis with the list provided in the request body.
  - `GET /clear`: Clears the gift list in Redis and resets it to an empty state.
- **Environment Variables:** The Redis connection is established using an environment variable `REDIS_URL` to allow easy configuration and deployment.

### Frontend
The frontend is implemented using **React Native**:
- **Gift Management:**
  - Gifts are managed in the component state, allowing for real-time updates to the list.
  - Gifts can be added, edited, and deleted directly within the app.
- **State Synchronization:**
  - The app interacts with the backend to save, restore, or clear gifts.
  - This ensures persistence and synchronization across sessions.
- **Interactive UI:**
  - A user-friendly interface with buttons for key actions: Save, Restore, and Clear.
  - Icons for editing and deleting gifts to enhance usability.

## Project Structure
```
.
├── backend
│   ├── app.js           # Main Node.js application file
│   ├── routes
│   │   └── gifts.js     # Express routes for gift list operations
│   ├── redisConfig.js   # Redis connection configuration
├── frontend
│   ├── App.js           # Main React Native component
│   ├── components       # Reusable UI components
│   │   ├── GiftList.js  # Component to display and manage gifts
│   │   └── GiftForm.js  # Component for adding and editing gifts
├── README.md            # Project documentation
└── .env                 # Environment variables for Redis connection
```

## Environment Variables
To configure the backend connection to Redis, use a `.env` file:
```
REDIS_URL=redis://localhost:6379
```
Replace `localhost` and `6379` with your Redis server's host and port if needed.

## How to Run
### Prerequisites
- **Backend:** Node.js, Redis
- **Frontend:** React Native CLI or Expo CLI

### Steps
1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd <repo_directory>
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   touch .env
   echo "REDIS_URL=redis://localhost:6379" > .env
   node app.js
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Run the app on your preferred emulator or device.

## Dependencies
### Backend
- **Node.js**: Server-side runtime
- **Express**: HTTP server framework
- **Redis**: In-memory database for gift storage
- **dotenv**: Load environment variables

### Frontend
- **React Native**: Cross-platform app framework
- **axios**: For API calls

## Future Enhancements
- Add user authentication for personalized gift management.
- Enable gift prioritization and categorization.
- Implement real-time updates using WebSockets.

## Author
Developed by Alexander Hernandez. For inquiries, feel free to reach out through [GitHub](https://github.com/Alex-Turing/santaGiftList).

