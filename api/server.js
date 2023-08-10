// IMPORTS AT THE TOP
const express = require('express')

const Dogs = require('./dog-model')
// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get('/', (_req,res) => {
    res.status(200).json({
        message: 'Hello World'
    })
})

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await Dogs.findAll(req.body);
        res.json(dogs);
    } catch (err) {
        err.status(404).json({
            message: 'Dogs not found!'
        });
    }
});

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', async (req, res) => {
    const doggyId = req.params.id;
    try {
        const doggy = await Dogs.findById(doggyId);
        if (!doggy) {
            res.status(404).json({
                message: 'Dog not found!'
            });
        } else {
            res.json(doggy);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!'
        });
    }
});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)



// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;