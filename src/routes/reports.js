const express = require('express');
const router = express.Router();
const Catering = require('../database/models/catering');
const Permanencia = require('../database/models/permanencia')
const PDFDocument = require('pdfkit');
const fs = require('fs');

//-------CATERING-------
router.get('/catering', async (req, res) => {
    try {
        const stockItems = await Catering.findAll();
        res.json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/catering', async (req, res) => {
    try {
        const newTask = await Catering.create({
            date: req.body.date,
            location: req.body.location,
            doctor: req.body.doctor,
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Generate and download a PDF with stock information
router.get('/catering/download/pdf', async (req, res) => {
    try {
        // Fetch stock items from the database
        const stockItems = await Catering.findAll();

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = 'Reporte_Catering.pdf';
        const filePath = `${__dirname}/../../public/${filename}`; // Adjust the path as needed

        // Pipe the PDF output to a file
        doc.pipe(fs.createWriteStream(filePath));

        // Write stock information to the PDF
        doc.fontSize(18).text('Reporte de Catering', { align: 'center' }).moveDown();
        stockItems.forEach(item => {
            doc.fontSize(12).text(`Fecha: ${item.date}`);
            doc.fontSize(12).text(`Sede: ${item.location}`);
            doc.fontSize(12).text(`Medico: ${item.doctor}`);
            doc.moveDown();
        });

        // Finalize the PDF and close the stream
        doc.end();

        // Send the PDF file as a response
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');
        const filestream = fs.createReadStream(filePath);
        filestream.pipe(res);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//----------PERMANENCIA--------
router.get('/permed', async (req, res) => {
    try {
        const stockItems = await Permanencia.findAll();
        res.json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/permed', async (req, res) => {
    try {
        const newTask = await Permanencia.create({
            doctor: req.body.doctor,
            from: req.body.from,
            to: req.body.to,
            hours: req.body.hours,
            location: req.body.location,
            role: req.body.role,
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Generate and download a PDF with stock information
router.get('/permed/download/pdf', async (req, res) => {
    try {
        // Fetch stock items from the database
        const stockItems = await Permanencia.findAll();

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = 'Reporte_PerMed.pdf';
        const filePath = `${__dirname}/../../public/${filename}`; // Adjust the path as needed

        // Pipe the PDF output to a file
        doc.pipe(fs.createWriteStream(filePath));

        // Write stock information to the PDF
        doc.fontSize(18).text('Reporte de Catering', { align: 'center' }).moveDown();
        stockItems.forEach(item => {
            doc.fontSize(12).text(`Nombre: ${item.doctor}`);
            doc.fontSize(12).text(`Fecha de inicio: ${item.from}`);
            doc.fontSize(12).text(`Fecha de fin: ${item.to}`);
            doc.fontSize(12).text(`Horas: ${item.hours}`);
            doc.fontSize(12).text(`Sede: ${item.location}`);
            doc.fontSize(12).text(`Cargo: ${item.role}`);
            doc.moveDown();
        });

        // Finalize the PDF and close the stream
        doc.end();

        // Send the PDF file as a response
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');
        const filestream = fs.createReadStream(filePath);
        filestream.pipe(res);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;