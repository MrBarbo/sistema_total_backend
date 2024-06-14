// routes/derivacionRoutes.js

const express = require('express');
const router = express.Router();
const Derivacion = require('../database/models/dereva');

// Fetch all derivaciones
router.get('/', async (req, res) => {
  try {
    const derivaciones = await Derivacion.findAll();
    res.json(derivaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new derivacion
router.post('/', async (req, res) => {
  try {
    const newDerivacion = await Derivacion.create(req.body);
    res.status(201).json(newDerivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update estado
router.put('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const derivacion = await Derivacion.findByPk(id);
    if (!derivacion) {
      return res.status(404).json({ error: 'Derivacion not found' });
    }
    derivacion.estado = estado;
    await derivacion.save();
    res.json(derivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add observacion
router.put('/derivaciones/:id/observaciones', async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;
    const derivacion = await Derivacion.findByPk(id);
    if (!derivacion) {
      return res.status(404).json({ error: 'Derivacion not found' });
    }
    derivacion.observaciones = observaciones;
    await derivacion.save();
    res.json(derivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
