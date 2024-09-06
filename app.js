const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Preloaded books array
let books = [
    { id: 1, title: "1969", author: "John Pork" },
    { id: 2, title: "To obtain the slurp juice", author: "Harble Dingleberry" },
    { id: 3, title: "I catch my eye", author: "John Williams" }
];

// 1. GET route to retrieve all books
app.get('/', (req, res) => {
    res.json(books);
});

// 2. GET route to retrieve a specific book by ID
app.get('/book', (req, res) => {
    const bookId = parseInt(req.query.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send('<h1>Book not found</h1>');
    }
});

// 3. GET route to display a form for adding a new book
app.get('/add-book', (req, res) => {
    res.send(`
        <form action="/add-book" method="POST">
            <label>Title: <input type="text" name="title" required /></label><br/>
            <label>Author: <input type="text" name="author" required /></label><br/>
            <button type="submit">Add Book</button>
        </form>
    `);
});

// 3. POST route to create a new book
app.post('/add-book', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.send(`<h1>Book added successfully!</h1><a href="/">Go back to book list</a>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});