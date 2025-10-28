# SketchCode Project

## Prerequisites

1. Install MongoDB Community Edition:
   ```powershell
   # Download MongoDB 6.0 Community Edition for Windows
   # From: https://www.mongodb.com/try/download/community
   
   # After installing, create data directory:
   mkdir C:\data\db
   ```

2. Install Node.js 18+ (if not already installed)

## Setup Database

1. Start MongoDB (pick one method):

   **If installed as Windows Service:**
   ```powershell
   net start MongoDB
   ```

   **OR manually start mongod:**
   ```powershell
   mongod --dbpath="C:\data\db"
   ```

   **OR using Docker:**
   ```powershell
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   ```

2. Verify MongoDB is running:
   ```powershell
   # Should connect without error
   mongosh "mongodb://localhost:27017"
   ```

## Setup Backend

1. Install dependencies:
   ```powershell
   cd backend
   npm install
   ```

2. Configure environment:
   - Copy `.env.example` to `.env`
   - Update MongoDB URL if needed (default works for local install)

3. Start the backend:
   ```powershell
   npm run start
   ```

   The server will start on http://localhost:8001

4. Create admin user (first time only):
   ```powershell
   # Using PowerShell
   Invoke-RestMethod -Method POST http://localhost:8001/api/setup/admin
   ```

## Setup Frontend

1. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```

2. Start development server:
   ```powershell
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## Default Login

- Email: sketchcode.dev@gmail.com  
- Password: admin@123

## Troubleshooting

1. If you see "MongoDB Connection Refused":
   - Check if MongoDB is running
   - Try manually starting mongod: `mongod --dbpath="C:\data\db"`
   - Verify MongoDB URL in backend/.env

2. If you see "Service Unavailable":
   - Backend is running but can't connect to MongoDB
   - Check MongoDB status and connection string
   - Restart backend after fixing MongoDB

3. To completely reset:
   ```powershell
   # Stop all servers
   net stop MongoDB  # if using service
   # OR
   # Find and stop mongod process
   
   # Clear data (careful - removes all data!)
   Remove-Item -Recurse -Force C:\data\db\*
   
   # Restart MongoDB
   net start MongoDB
   # OR
   mongod --dbpath="C:\data\db"
   
   # Restart backend
   cd backend
   npm run start
   ```

## Architecture

- Frontend: React + Vite (Port 5173)
- Backend: Express.js (Port 8001)
- Database: MongoDB (Port 27017)

All API endpoints under `/api/*` require authentication except:
- POST `/api/auth/login`
- GET `/ping`
- POST `/api/setup/admin` (first-time setup only)