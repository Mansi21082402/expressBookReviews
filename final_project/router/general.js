const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/books');
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const response = await axios.get(`http://localhost:5000/books/author/${author}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const response = await axios.get(`http://localhost:5000/books/title/${title}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Get books by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`http://localhost:5000/books/isbn/${isbn}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports.general = public_users;
