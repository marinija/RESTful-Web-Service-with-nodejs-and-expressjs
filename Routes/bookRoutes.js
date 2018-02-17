const express = require('express');

const routes = function(Book) {
    const bookRouter = express.Router();

    bookRouter.route('/')
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get(function(req, res){
        const query = {};

        if(req.query) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    });
    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if(err) {
                res.status(500).send(err);
            } else if(book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No book found');
            } 
        });
    })
    bookRouter.route('/:bookId').get((req, res) => {
        res.json(req.book);
    })
    .put((req, res) => {
       /* Book.findById(req.params.bookId, (err, book) => {
            if(err) {
                res.status(500).send(err);
            } else {*/
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save((err) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
    })
    .patch((req, res) => {
        if(req.body._id) {
            delete req.body._id;
        }
        for(let p in req.body) {
            req.book[p] = req.body[p];
        }
        req.book.save((err) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    })
    .delete((req, res) => {
        req.book.remove((err) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });
    return bookRouter;
};

module.exports = routes;