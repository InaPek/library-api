const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books');
    },

    filename(req, file, cb) {
        const ext = path.extname(file.originalname); // получаем расширение (.pdf, .epub)
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});

const fileMiddleware = multer({ storage }).single('fileBook');

module.exports = fileMiddleware;
