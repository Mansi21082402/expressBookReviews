const express = require('express');
const axios = require('axios');
let books = require('./booksdb.js'); // local data
const public_users = express.Router();

// Example: Get book by ISBN using async/await
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        if (books[isbn]) {
            // Simulate an async call
            const data = await new Promise(resolve => resolve(books[isbn]));
            return res.json(data);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Example: Get books by author using async/await
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();
        const result = {};
        for (const [isbn, book] of Object.entries(books)) {
            if (book.author.toLowerCase() === author) {
                result[isbn] = book;
            }
        }
        const data = await new Promise(resolve => resolve(result));
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Example: Get books by title using async/await
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();
        const result = {};
        for (const [isbn, book] of Object.entries(books)) {
            if (book.title.toLowerCase() === title) {
                result[isbn] = book;
            }
        }
        const data = await new Promise(resolve => resolve(result));
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports.general = public_users;

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
