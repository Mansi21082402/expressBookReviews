const express = require('express');
const axios = require('axios');
let books = require('./booksdb.js'); // still keep local data for reviews
const public_users = express.Router();

// Get book by ISBN using Axios + async/await
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
        
        if (response.data) {
            return res.json(response.data);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get books by author using Axios + async/await
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const response = await axios.get(`https://openlibrary.org/search.json?author=${author}`);
        
        if (response.data.docs.length > 0) {
            return res.json(response.data.docs);
        } else {
            return res.status(404).json({ message: "No books found for this author" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get books by title using Axios + async/await
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        
        if (response.data.docs.length > 0) {
            return res.json(response.data.docs);
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get book review (still from local data)
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
