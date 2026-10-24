const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [];

let nextId = 1;

app.post('/api/user/login', (req, res) => {
    res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find((b) => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json(book);
});

app.post('/api/books', (req, res) => {
    const newBook = {
        id: String(nextId++),
        title: req.body.title || '',
        description: req.body.description || '',
        authors: req.body.authors || '',
        favorite: req.body.favorite || '',
        fileCover: req.body.fileCover || '',
        fileName: req.body.fileName || '',
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const index = books.findIndex((b) => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    books[index] = {
        ...books[index],
        ...req.body,
        id: books[index].id,
    };

    res.json(books[index]);
});

app.delete('/api/books/:id', (req, res) => {
    const index = books.findIndex((b) => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    books.splice(index, 1);
    res.json('ok');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
