# KK's Cafe Menu Website

A beautiful, fully functional cafe menu website with image uploads and persistent storage. Perfect for showcasing your drinks and accepting new items online.

## Features

✨ **Beautiful Design**
- Elegant chrome and wood aesthetic
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

🎯 **Core Functionality**
- View all drinks in a beautiful grid
- Add new drinks with descriptions
- Upload images for each drink (drag & drop supported)
- Edit existing drinks
- Delete drinks
- Persistent storage (data persists between sessions)

🚀 **Easy Deployment**
- One-click deployment to Replit or Glitch
- No database setup needed (uses file-based storage)
- Free hosting included

## Project Structure

```
kks-cafe/
├── server.js           # Express server and API routes
├── package.json        # Project dependencies
├── .env.example        # Example environment variables
├── data.json          # Persistent drink data (auto-created)
├── public/
│   └── index.html     # Frontend with API integration
└── uploads/           # Uploaded drink images (auto-created)
```

## Deployment to Replit

### Step 1: Create a Replit Account
1. Go to [replit.com](https://replit.com)
2. Sign up for a free account

### Step 2: Create a New Replit Project
1. Click "Create" → "New Replit"
2. Choose "Import from GitHub" or "Create from template"
3. If importing from GitHub, paste this repo URL
4. Or, create manually:
   - Select "Node.js" as the language
   - Name it "kks-cafe"

### Step 3: Upload Your Files to Replit
If creating manually, upload these files:

1. **package.json** - Copy the entire content
2. **server.js** - Copy the entire content
3. **.env.example** - Copy and rename to **.env**
4. Create folders:
   - `public/` 
   - `uploads/`
5. **public/index.html** - Copy the entire frontend code

### Step 4: Install Dependencies
1. In Replit, open the terminal
2. Run: `npm install`
3. Wait for packages to install

### Step 5: Run the Server
1. Click "Run" button (or in terminal: `npm start`)
2. Click the URL at the top to view your live site
3. You should see "KK's Cafe" with the beautiful design

### Step 6: Share Your Link
Your site is now live! Share the Replit URL with anyone. The URL will look like:
`https://kks-cafe.username.repl.co`

## Deployment to Glitch

### Step 1: Go to Glitch
1. Visit [glitch.com](https://glitch.com)
2. Sign up or log in

### Step 2: Create New Project
1. Click "New Project" → "glitch-hello-node"
2. Name it "kks-cafe"

### Step 3: Upload Files
1. In the left sidebar, click "Assets"
2. Copy-paste each file:
   - `package.json`
   - `server.js`
   - `.env.example` (rename to `.env`)
   - `public/index.html`

3. Create folders in `.glitch/` or use the file editor

### Step 4: Install Dependencies
Glitch auto-installs from package.json. Wait for the installation to complete.

### Step 5: View Your Site
1. Click "Show" → "In a new window"
2. Your site is live!
3. Glitch provides a shareable URL automatically

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Start the server
npm start

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
- **HTML5** with semantic markup
- **CSS3** with animations and gradients
- **Vanilla JavaScript** (no dependencies)
- **Fetch API** for server communication

### Deployment Platforms
- **Replit**: Free Node.js hosting
- **Glitch**: Free Node.js hosting with auto-scaling
- Both platforms handle traffic spikes automatically

## Environment Variables

Create a `.env` file in the root:

```
PORT=3000
NODE_ENV=development
```

## Troubleshooting

### Images not uploading?
- Check file size (max 5MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Check browser console for errors (F12)

### Data not persisting?
- Ensure `data.json` exists in the root directory
- Check server logs for write errors
- On Replit/Glitch, data persists in the file system

### Port conflicts?
- Change `PORT` in `.env` file
- Default is 3000, try 3001 if already in use

## API Documentation

### GET /api/drinks
Returns all drinks

**Response:**
```json
[
  {
    "id": 1234567890,
    "name": "Espresso",
    "description": "Rich and bold coffee shot",
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

## Next Steps

1. **Customize the design** - Edit colors in `public/index.html` style section
2. **Change the title** - Replace "KK's Cafe" with your cafe name
3. **Add more features** - Consider adding:
   - Drink categories
   - Pricing
   - Admin authentication
   - Customer reviews

## Support

For issues or questions:
1. Check the browser console (F12) for errors
2. Check server logs (Replit/Glitch shows them)
3. Verify all files are uploaded correctly

## License

MIT - Feel free to use and modify!

---

**Happy serving! ☕**
