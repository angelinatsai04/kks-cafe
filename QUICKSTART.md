# Quick Start Guide for Replit/Glitch

## 🚀 Fastest Way to Get Live (5 minutes)

### Option 1: Replit (Recommended for Beginners)

**Step 1: Create Replit Project**
1. Go to [replit.com](https://replit.com) → Sign up/Login
2. Click "Create" button
3. Select "Import from GitHub" 
4. If you have a GitHub repo, paste the URL; otherwise:
   - Select "Node.js" template
   - Name: `kks-cafe`

**Step 2: Upload Your Files**
1. On the left, click the file icon
2. Create these files by clicking the "+" icon:
   - Click "+" next to file list
   - Create `package.json` and copy content
   - Create `server.js` and copy content  
   - Create `.env` and copy from `.env.example`

3. Create folders:
   - Click "+" → select "New Folder"
   - Name: `public`
   - Name: `uploads`

4. Inside `public/` folder:
   - Create `index.html` with frontend code

**Step 3: Run It**
1. Click the green "Run" button at top
2. Wait 10-15 seconds
3. Click the URL shown at the top
4. 🎉 Your cafe menu is live!

**Step 4: Share**
- Copy the URL from the top (e.g., `https://kks-cafe.username.repl.co`)
- Share anywhere!

---

### Option 2: Glitch (Also Great)

**Step 1: Create Glitch Project**
1. Go to [glitch.com](https://glitch.com) → Sign up/Login
2. Click "New Project" → "glitch-hello-node"
3. Name it `kks-cafe`

**Step 2: Upload Files**
1. Click "Assets" in left sidebar (folder icon)
2. Drag & drop your files or click to upload:
   - `package.json`
   - `server.js`
   - `.env` (copy from `.env.example`)

3. Create `public` folder → upload `index.html`
4. Glitch auto-creates `uploads` folder

**Step 3: Auto Starts**
- Glitch automatically installs dependencies and starts your app
- Click "Show" → "In a new window"
- Your site is live! 🎉

**Step 4: Share**
- Glitch gives you a live URL automatically
- Share the URL with anyone

---

## 📝 Files You Need

```
kks-cafe/
├── server.js              ← Copy from project files
├── package.json           ← Copy from project files
├── .env                   ← Create from .env.example
├── public/
│   └── index.html         ← Copy from project files
└── uploads/               ← Auto-created by server
```

## ⚡ What This Does

- **server.js**: Runs your web server
- **package.json**: Lists dependencies (Express, Multer, etc.)
- **public/index.html**: Your beautiful cafe menu website
- **uploads/**: Stores uploaded drink images
- **.env**: Configuration (port, environment)

## ✅ Testing Locally First (Optional)

Before deploying, test on your computer:

```bash
# In terminal, go to your project folder
cd Desktop/kks-cafe

# Install packages
npm install

# Run server
npm start

# Open: http://localhost:3000
```

## 🖼️ Features Available

Once deployed:

✅ Add drinks with names & descriptions
✅ Upload images (drag & drop supported)
✅ Edit existing drinks  
✅ Delete drinks
✅ Beautiful chrome & wood aesthetic
✅ Mobile responsive
✅ Everything persists (data saved forever)

## 🎨 Customization

To change colors/design:
1. Go to `public/index.html`
2. Find the `<style>` section
3. Change colors like `#c9a961` (gold) to whatever you want

## 💡 Tips

- **Replit is easier** if you've never done this before
- **Glitch is faster** to get started
- Both are **completely free**
- Your data **persists forever**
- Share the URL with anyone - they can view your menu

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` in terminal |
| Page shows 404 | Make sure `public/index.html` exists |
| Images won't upload | Check file size < 5MB, format is JPG/PNG |
| Data disappears | Check `data.json` exists in root |

## 📱 Your Live URL Will Look Like:

- **Replit**: `https://kks-cafe.yourname.repl.co`
- **Glitch**: `https://kks-cafe.glitch.me`

Share this with customers! ☕

---

**Need more help?** Check the full README.md in the project folder.
