const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Book = require('../../classes/Book');
const fileMiddleware = require('../../middleware/file');

router.get('/', (req, res) => {
    res.json(Book.getAll());
});

router.get('/:id', (req, res) => {
    const book = Book.getById(req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json(book);
});

router.post('/', fileMiddleware, (req, res) => {
    // Если файл был загружен, multer кладет его в req.file
    const fileName = req.file ? req.file.filename : '';

    const bookData = {
        ...req.body,
        fileName: fileName,
        fileBook: req.file ? req.file.path : '', 
    };

    const newBook = Book.create(bookData);
    res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
    const updatedBook = Book.update(req.params.id, req.body);

    if (!updatedBook) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.json(updatedBook);
});

router.delete('/:id', (req, res) => {
    const book = Book.getById(req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Книга не найдена' });
    }

    if (book.fileBook) {
        const filePath = path.resolve(book.fileBook);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    Book.delete(req.params.id);
    res.json('ok');
});

router.get('/:id/download', (req, res) => {
    const book = Book.getById(req.params.id);

    if (!book || !book.fileBook) {
        return res.status(404).json({ error: 'Файл не найден' });
    }

    const filePath = path.resolve(book.fileBook);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Файл не найден на диске' });
    }

    const downloadName = book.fileName || `book-${book.id}.txt`;
    res.download(filePath, downloadName);
});

module.exports = router;
