# KK's Cafe Menu Website

A functional aesthetic home cafe menu website for my best friend! User friendly image uploads and persisting data, with add, edit, and remove functionality.

## Features

✨ **Design**
- Responsive design (mobile, tablet, desktop)
- Clean structure and user interactions

🎯 **Core Functionality**
- View drinks in minimalistic grid
- Add new drinks with descriptions and (multiple) images
- Upload images for each drink (drag & drop supported)
- Edit existing drinks
- Delete drinks
- Persistent storage (data persists and page is deployed on Railway)


## Local Development

To run locally before deploying:

```bash
# Install dependencies
npm install

# Start the server
npm start

# OR specify the port with:
PORT=3010 npm start

# Open browser to http://localhost:3000
```

## How to Use

### Adding a Drink
1. Click "+ Add New Drink"
2. Enter drink name and description
3. (Optional) Upload an image by:
   - Clicking the upload area
   - Dragging and dropping an image
4. Click "Add Drink"

### Editing a Drink
1. Hover over a drink card
2. Click the ✏️ (edit) icon
3. Modify the details
4. Click "Update Drink"

### Deleting a Drink
1. Hover over a drink card
2. Click the ✕ (delete) icon
3. Confirm deletion

## Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

Max file size: 5MB per image

## Technical Details

### Backend
- **Framework**: Express.js
- **File Storage**: JSON file (`data.json`)
- **Image Upload**: Multer
- **Static Files**: Express static middleware

### Frontend
- **HTML5** 
- **CSS3** 
- **Vanilla JavaScript** 
- **Fetch API**

### Deployment Platforms
- **Railway**

## Environment Variables

Create a `.env` file in the root:

```
PORT=3000
NODE_ENV=development
```

## API Documentation

### GET /api/drinks
Returns all drinks

**Response:**
```json
[
  {
    "id": 1234567890,
    "name": "blueberry matcha",
    "description": "blueberry jam w/ blueberry cream top",
    "image": "/uploads/drink-1234567890-123456789.jpg"
  }
]
```

### POST /api/drinks
Create a new drink

**Form Data:**
- `name` (string, required)
- `description` (string, required)
- `image` (file, optional)

### PUT /api/drinks/:id
Update a drink

**Form Data:**
- `name` (string, required)
- `description` (string, required)
- `image` (file, optional)

### DELETE /api/drinks/:id
Delete a drink

## License

MIT - Feel free to use and modify!

---

**Happy serving! ☕**
