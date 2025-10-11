import express from 'express';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

let products = [
    { title: "Skuks", desc: "Explosive" },
    { title: "Smegma", desc: "Death" },
    { title: "Shosh", desc: "???" },
];

app.get('/', (req, res) => {
    res.render('index', { products: products });
});

app.post('/add-product', (req, res) => {
    const { title, description } = req.body;
    if (title) {
        products.push({ title, description });
    }
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404);
    res.render('notfound');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});