const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.json()); // for parsing application/json

// In-memory data store
let items = [];

// Create - POST
app.post('/items', (req, res) => {
    // logging of request with time
    console.log(`Request time: ${Date.now()}, POST: ${JSON.stringify(req.body)}`);
    const item = req.body;
    item.id = items.length + 1;
    items.push(item);
    res.status(201).send(item);
});

// Read - GET all items
app.get('/items', (req, res) => {
    // logging of request with time
    console.log(`Request time: ${Date.now()}, GET: `);
    res.status(200).send(items);
});

// Read - GET single item by id
app.get('/items/:id', (req, res) => {
    // logging of request with time
    console.log(`Request time: ${Date.now()}, GET: ${req.params.id}`);
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.status(200).send(item);
});

// Update - PUT
app.put('/items/:id', (req, res) => {
    // logging of request with time
    console.log(`Request time: ${Date.now()}, PUT: ${req.params.id}, ${JSON.stringify(req.body)}`);
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    Object.assign(item, req.body);
    res.status(200).send(item);
});

// Delete - DELETE
app.delete('/items/:id', (req, res) => {
    // logging of request with time
    console.log(`Request time: ${Date.now()}, DELETE: ${req.params.id}`);
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Item not found');
    }
    items.splice(index, 1);
    res.status(204).send();
});

const PORT = 5000;
const util = process.env.NAME || "App"
app.listen(PORT, () => {
    console.log(`${util} running on port ${PORT}`);
});
