import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import url from 'url';
import fs from 'fs';
import db from './db.js';

// Підготовка та створення
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Створення застосунку
const app = express();

// Middleware
app.use(express.static('static'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({storage});

// Routes
app.get('/', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        let products = result;
        products.forEach((product) => {
            product.image = JSON.parse(product.image);
        });
        res.render('index', {products});
    });
});

app.post('/add', upload.fields([{name: 'image'}]), (req, res) => {
    const data = req.body;
    data.image = req.files.image.map(file => file.filename);
    data.image = JSON.stringify(data.image);
    db.query("INSERT INTO products SET ?", data, (err) => {
        res.status(201);
        res.end();
    });
});

app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    db.query(
    `SELECT p.*, c.id AS commentId, c.author, c.comment
    FROM products p
    LEFT JOIN comments c ON c.post_id = p.id
    WHERE p.id = ?`,
    postId,
    (err, result) => {
        if (err || result.length === 0) return res.status(404).render('notfound');
        let product = {
            id: result[0].id,
            title: result[0].title,
            description: result[0].description,
            image: JSON.parse(result[0].image),
            comments: result.map((row) => {
                return {
                    id: row.commentId,
                    author: row.author,
                    comment: row.comment,
                };
            }),
        };
        res.render('post', {product});
    });
});

app.post('/comment', (req, res) => {
    let data = req.body;
    db.query("INSERT INTO comments SET ?", data, (err) => {
        res.status(201);
        res.end();
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('notfound');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
