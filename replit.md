# KK's Cafe Menu Website

## Overview
A beautiful, fully functional cafe menu website with image uploads and persistent storage. Built with Express.js backend and vanilla JavaScript frontend.

## Project Structure
```
├── server.js           # Express server and API routes
├── package.json        # Project dependencies
├── data.json           # Persistent drink data (file-based storage)
├── public/
│   └── index.html      # Frontend with API integration
└── uploads/            # Uploaded drink images
```

## How to Run
- The application runs on port 5000 (bound to 0.0.0.0)
- Start command: `npm start`
- Dependencies are managed via npm

## Features
- View all drinks in a grid layout
- Add new drinks with descriptions and images
- Edit existing drinks
- Delete drinks
- Drag & drop image upload support
- File-based persistent storage (data.json)

## API Endpoints
- `GET /api/drinks` - Get all drinks
- `POST /api/drinks` - Create a new drink (with optional image)
- `PUT /api/drinks/:id` - Update a drink
- `DELETE /api/drinks/:id` - Delete a drink

## Technical Details
- Backend: Express.js with Multer for file uploads
- Frontend: Vanilla HTML/CSS/JavaScript
- Storage: JSON file (data.json) for drinks, /uploads for images
- Max image size: 5MB
- Supported formats: JPEG, PNG, GIF, WebP
