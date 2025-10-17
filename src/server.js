import express from 'express';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

let products = [
    { title: "Skuks", description: "Explosive" },
    { title: "Smegma", description: "Death" },
    { title: "Shosh", description: "???" },
];

app.get('/', (req, res) => {
    res.render('index', { products: products });
});

app.post('/add-product', (req, res) => {
    const { title, description } = req.body;
    products.push({ title: title, description: description });
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404);
    res.render('notfound');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});