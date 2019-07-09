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

server.get('/api/posts/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
        .then(data => {
            if(data){
                res.status(200).json(data);
            }else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
    .then(data => {
        if(newPost.title && newPost.contents){
            res.status(201).json({ success: 'true', newPost })
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})


server.listen(4001, () => {
    console.log('\n*** Server Running on http://localhost:4001 ***\n');
  });