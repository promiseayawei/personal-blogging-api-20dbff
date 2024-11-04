const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads

// Set up storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Create a new post with image upload
app.post('/api/posts', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;
    db.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, image], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({ id: results.insertId, title, content, image });
    });
});

// Get all posts
app.get('/api/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Get a post by ID
app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(results[0]);
    });
});

// Update a post
app.put('/api/posts/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Preserve old image if no new upload
    db.query('UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ id, title, content, image });
    });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
