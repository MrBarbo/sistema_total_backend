const express = require('express');
const router = express.Router();
const Task = require('../database/models/tareas');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({
            Tarea: req.body.Tarea,
            Descripcion: req.body.Descripcion,
            Responsable: req.body.Responsable,
            FechaDeInicio: req.body.FechaDeInicio,
            FechaDeFin: req.body.FechaDeFin,
            Estatus: req.body.Estatus
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Task.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTask = await Task.findByPk(req.params.id);
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Task.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
