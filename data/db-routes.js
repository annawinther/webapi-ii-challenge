const express = require('express');
const db = require('./data/db');
const route = express.Router();

route.get('/', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

route.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
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

route.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    db.findPostComments(postId)
        .then(data => {
            if(data){
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        }) 
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})



route.post('/', (req, res) => {
    const postData = req.body;
    db.insert(postData)
    .then(data => {
        if(postData.title && postData.contents){
            res.status(201).json({ success: 'true', postData })
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

route.delete('/:id', (req, res) => {
    const postId = req.params.id;
    db.remove(postId)
        .then(data => {
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

route.put('/:id', (req, res) => {
    const postId = req.params.id;
    const postData = req.body;
    if(postData && postData.title && postData.contents){
        db.update(postId, postData)
            .then(data => {
                if(data){
                   return db.findById(postId)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .then(data => {
                res.status(200).json(postData)
            })
            .catch(error => {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            })
    } else {
        res.status(500).json({ error: "The post information could not be modified." })
    }
})

module.exports = route;