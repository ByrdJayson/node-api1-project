// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model.js')

const server = express()

server.use(express.json())


//GET REQUESTS
server.get('/api/users', async (req, res ) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch(err){
        res.status(500).json({message: err.message})
    }

})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findById(id)
        if(!user){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(user)
        }
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//POST REQUESTS
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        const newUser = await Users.insert({name, bio})

        if(!newUser.name || !newUser.bio) {
            return res.status(400).json({message: "Please provide name and bio for the user"})
        }
        return res.status(201).json(newUser)
    } catch(err) {
        return res.status(500).json({message: "There was an error while saving the user to the database"})
    }
})

//DELETE REQUESTS
server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.remove(id)
        if(!user) {
            return res.status(404).json({message: "The user with the specified ID does not exist"})
        } else return user
    } catch(err) {
        res.status(500).json({message: "The user could not be removed"})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
