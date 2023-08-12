// IMPORTS AT THE TOP
const express = require('express')

const Dogs = require('./dog-model');
const { restart } = require('nodemon');
// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json())
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
        const dogs = await Dogs.findAll();
        res.status(200).json(dogs);
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
                message: `Dog not found with id ${doggyId}`
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
server.post('/api/dogs', async (req, res) => {
    try{
        const {name, weight} = req.body;
        if(!name || !weight){
            res.status(422).json({
                message: `Dog needs name ad weight`

            })
        } else {
            const createdDog = await Dogs.create({ name, weight} )
            res.status(201).json({
            message: "success creating dog",
            data: createdDog,
        })
        }
    }catch(err){
        res.status(500).json({
            message: `Error creating dog`
        })
    }
});

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req, res) => {
     
    try {
        const {id} = req.params;
        const {name, weight} = req.body;
        if(!name || !weight){
            res.status(422).json({
                message: "Dogs need name and weight."
            })
        } else {
        const updatedDog = await Dogs.update(id, { name, weight })
        res.status(200).json({
            message: "Dog was updated",
            data: updatedDog
        })
    }
    } catch (err) {
        res.status(500).json({
            message: `Cannot update dog: ${err.message}`
        })
    }
})



// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dog = req.body;
        
        const deletedDog = await Dogs.delete(id);

        if (deletedDog) {
            res.status(200).json({
                message: 'Dog deleted successfully',
                deletedDog: deletedDog
            });
        } else {
            res.status(404).json({
                message: 'Dog not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Cannot delete dog: ${err.message}`
        });
    }
});


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;