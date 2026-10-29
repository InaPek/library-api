class Book {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }

    getAll() {
        return this.books;
    }


    getById(id) {
        return this.books.find((book) => book.id === id);
    }

    create(data) {
        const newBook = {
            id: String(this.nextId++),
            title: data.title || '',
            description: data.description || '',
            authors: data.authors || '',
            favorite: data.favorite || false,
            fileCover: data.fileCover || '',
            fileName: data.fileName || '',
            fileBook: data.fileBook || '', 
        };
        this.books.push(newBook);
        return newBook;
    }

    update(id, data) {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) return null;

        this.books[index] = {
            ...this.books[index],
            ...data,
            id: this.books[index].id, 
        };
        return this.books[index];
    }

    delete(id) {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) return null;

        this.books.splice(index, 1);
        return true;
    }
}

module.exports = new Book();