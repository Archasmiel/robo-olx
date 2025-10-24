import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import multer from 'multer';
import path from 'path';
import url from 'url';
import fs from 'fs';

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Збереження даних (тестово)
let products = [];

// Routes
app.get('/', (req, res, next) => {
    // solely for testing
    console.log(products.length);
    next();
}, (req, res) => {
    res.render('index', { products });
});

app.post('/add', upload.fields([{ name: 'image' }]), (req, res) => {
    const data = req.body;
    data.image = req.files.image.map(file => file.filename);
    data.id = products.length;
    products.push(data);
    res.redirect('/');
});

app.get('/post/:id', (req, res, next) => {
    const postId = req.params.id;
    if (products[postId]) console.log(products[postId]);
    next();
}, (req, res) => {
    const postId = req.params.id;
    const product = products[postId];
    if (!product) return res.status(404).render('notfound');
    res.render('post', { product });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('notfound');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
