const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// POST new drink with optional image
app.post('/api/drinks', upload.single('image'), (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const drinks = readDrinks();
        const newDrink = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim(),
            image: req.file ? `/uploads/${req.file.filename}` : ''
        };

        drinks.push(newDrink);
        writeDrinks(drinks);

        res.status(201).json(newDrink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) a drink
app.put('/api/drinks/:id', upload.single('image'), (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, keepImage } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const drinks = readDrinks();
        const drinkIndex = drinks.findIndex(d => d.id === parseInt(id));

        if (drinkIndex === -1) {
            return res.status(404).json({ error: 'Drink not found' });
        }

        // Delete old image if replacing with new one
        if (req.file && drinks[drinkIndex].image) {
            const oldImagePath = path.join(__dirname, 'public', drinks[drinkIndex].image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        drinks[drinkIndex] = {
            ...drinks[drinkIndex],
            name: name.trim(),
            description: description.trim(),
            image: req.file ? `/uploads/${req.file.filename}` : (keepImage ? drinks[drinkIndex].image : '')
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

// Start server
app.listen(PORT, () => {
    console.log(`🎯 KK's Cafe server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
