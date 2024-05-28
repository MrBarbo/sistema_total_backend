// routes/consults.js
const express = require('express');
const router = express.Router();
const Consultas = require('../database/models/consultas');

// Crear una nueva consulta
router.post('/', async (req, res) => {
  try {
    data= {
      patientName: req.body.patientName,
      date: req.body.date,
      pathology: req.body.pathology,
      observations: req.body.observations,
      medicationName: req.body.medicationName,
      drug: req.body.drug,
      action: req.body.action,
      quantity: req.body.quantity
    }
    const newConsulta = await Consultas.create(data);
    res.status(201).json(newConsulta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las consultas
router.get('/', async (req, res) => {
  try {
    const consultas = await Consultas.findAll();
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una consulta por ID
router.get('/:id', async (req, res) => {
  try {
    const consulta = await Consultas.findByPk(req.params.id);
    if (consulta) {
      res.json(consulta);
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una consulta por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Consultas.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedConsulta = await Consultas.findByPk(req.params.id);
      res.json(updatedConsulta);
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una consulta por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Consultas.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
