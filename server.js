const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'drink-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Database file path
const dataFile = path.join(__dirname, 'data.json');

// Helper functions
const readDrinks = () => {
    try {
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading drinks:', error);
        return [];
    }
};

const writeDrinks = (drinks) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(drinks, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing drinks:', error);
        return false;
    }
};

// API Routes

// GET all drinks
app.get('/api/drinks', (req, res) => {
    const drinks = readDrinks();
    res.json(drinks);
});

// POST new drink with optional images
app.post('/api/drinks', upload.array('images', 10), (req, res) => {
    try {
        const { name, description, urlImages } = req.body;
        
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const drinks = readDrinks();
        
        // Combine uploaded files and URL images
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }
        
        // Add URL images if provided
        if (urlImages) {
            try {
                const parsedUrls = JSON.parse(urlImages);
                images = [...images, ...parsedUrls];
            } catch (e) {
                // urlImages might be a single URL string
                if (urlImages && typeof urlImages === 'string') {
                    images.push(urlImages);
                }
            }
        }

        const newDrink = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim(),
            images: images,
            image: images[0] || ''
        };

        drinks.push(newDrink);
        writeDrinks(drinks);

        res.status(201).json(newDrink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) a drink
app.put('/api/drinks/:id', upload.array('images', 10), (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, urlImages, keptExistingImages } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const drinks = readDrinks();
        const drinkIndex = drinks.findIndex(d => d.id === parseInt(id));

        if (drinkIndex === -1) {
            return res.status(404).json({ error: 'Drink not found' });
        }

        // Prepare images array
        let images = [];
        
        // Start with kept existing images (images that weren't removed)
        if (keptExistingImages) {
            try {
                const keptImages = JSON.parse(keptExistingImages);
                images = [...keptImages];
            } catch (e) {
                // keptExistingImages might be empty or malformed
            }
        }
        
        // Add newly uploaded files
        if (req.files && req.files.length > 0) {
            images = [...images, ...req.files.map(file => `/uploads/${file.filename}`)];
        }
        
        // Add new URL images if provided
        if (urlImages) {
            try {
                const parsedUrls = JSON.parse(urlImages);
                images = [...images, ...parsedUrls];
            } catch (e) {
                if (urlImages && typeof urlImages === 'string') {
                    images.push(urlImages);
                }
            }
        }

        // If no images at all, keep existing ones (safety fallback)
        if (images.length === 0 && drinks[drinkIndex].images) {
            images = drinks[drinkIndex].images;
        }

        drinks[drinkIndex] = {
            ...drinks[drinkIndex],
            name: name.trim(),
            description: description.trim(),
            images: images,
            image: images[0] || ''
        };

        writeDrinks(drinks);
        res.json(drinks[drinkIndex]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a drink
app.delete('/api/drinks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const drinks = readDrinks();
        const drink = drinks.find(d => d.id === parseInt(id));

        if (!drink) {
            return res.status(404).json({ error: 'Drink not found' });
        }

        // Delete associated image
        if (drink.image) {
            const imagePath = path.join(__dirname, 'public', drink.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const filtered = drinks.filter(d => d.id !== parseInt(id));
        writeDrinks(filtered);

        res.json({ message: 'Drink deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir));

// Start server with error handling for common listen errors (EADDRINUSE)
const server = app.listen(PORT, HOST, () => {
    console.log(`KK's Cafe server running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`\nError: Port ${PORT} is already in use.`);
        console.error('Possible fixes:');
        console.error(`  • Find and stop the process using the port: lsof -i :${PORT}  (then kill PID)`);
        console.error(`  • Start the app on a different port: PORT=3000 npm start`);
        console.error('Exiting.');
        process.exit(1);
    }
    console.error('Server error:', err);
});
