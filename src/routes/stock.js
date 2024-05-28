const express = require('express');
const router = express.Router();
const Stock = require('../database/models/stock');

// Get all stock items
router.get('/', async (req, res) => {
    try {
        const stockItems = await Stock.findAll();
        res.json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single stock item by ID
router.get('/:id', async (req, res) => {
    try {
        const stockItem = await Stock.findByPk(req.params.id);
        if (stockItem) {
            res.json(stockItem);
        } else {
            res.status(404).json({ error: 'Stock item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new stock item
router.post('/', async (req, res) => {
    try {
        const newStockItem = await Stock.create(req.body);
        res.status(201).json(newStockItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a stock item
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Stock.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedStockItem = await Stock.findByPk(req.params.id);
            res.json(updatedStockItem);
        } else {
            res.status(404).json({ error: 'Stock item not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a stock item
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Stock.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Stock item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Increase stock item quantity by 1
router.patch('/:id/increase', async (req, res) => {
    try {
        const stockItem = await Stock.findByPk(req.params.id);
        if (stockItem) {
            stockItem.Cantidad += 1;
            await stockItem.save();
            res.json(stockItem);
        } else {
            res.status(404).json({ error: 'Stock item not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Decrease stock item quantity by 1
router.patch('/:id/decrease', async (req, res) => {
    try {
        const stockItem = await Stock.findByPk(req.params.id);
        if (stockItem) {
            stockItem.Cantidad -= 1;
            await stockItem.save();
            res.json(stockItem);
        } else {
            res.status(404).json({ error: 'Stock item not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
