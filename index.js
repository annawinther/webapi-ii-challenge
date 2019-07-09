const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})




server.listen(4001, () => {
    console.log('\n*** Server Running on http://localhost:4001 ***\n');
  });