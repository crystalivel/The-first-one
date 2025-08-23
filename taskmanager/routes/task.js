const express = require("express")
const router = express.Router()
const Task = require("../models/task")

// Create task
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ message: 'Not found' })
        res.json(task)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Update task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json({ message: 'Not found' })
        res.json(task)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Not found' })
        res.json({ message: 'task deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
