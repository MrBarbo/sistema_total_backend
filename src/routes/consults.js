// routes/consults.js
const express = require('express');
const router = express.Router();
const Consultas = require('../database/models/consultas');
const Medication = require('../database/models/medicacionesrec')

// Create a new consultation with associated medications
router.post('/', async (req, res) => {
  const { patientName, date, pathology, company, medications } = req.body;
  try {
      const newConsulta = await Consultas.create({
          patientName,
          date,
          pathology,
          company
      });

      // Create associated medications
      if (medications && medications.length > 0) {
          const medicationPromises = medications.map(medication => Medication.create({
              consultaId: newConsulta.id, // Foreign key
              medicationName: medication.medicationName,
              drug: medication.drug,
              quantity: medication.quantity
          }));
          await Promise.all(medicationPromises);
      }

      res.status(201).json(newConsulta);
  } catch (error) {
      res.status(400).json({ error:error.message });
  }
});

// Obtener todas las consultas con sus recetas asociadas
router.get('/', async (req, res) => {
  try {
    const consultas = await Consultas.findAll({
      include: Medication // Include associated Recetas
    });
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
