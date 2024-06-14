const express = require('express');
const router = express.Router();
const Stock = require('../database/models/stock');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
        const newStockItem = await Stock.create({
            Producto: req.body.Producto,
            Droga: req.body.Droga,
            Accion: req.body.Accion,
            Cantidad: req.body.Cantidad,
            Vencimiento: req.body.Vencimiento,
        });
        res.status(201).json(newStockItem);
    } catch (error) {
        res.status(400).json({ error });
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

// Generate and download a PDF with stock information
router.get('/download/pdf', async (req, res) => {
    try {

        // Fetch stock items from the database
        const stockItems = await Stock.findAll();

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = 'Reporte_Stock.pdf';
        const filePath = `${__dirname}/../../public/${filename}`; // Adjust the path as needed

        // Pipe the PDF output to a file
        doc.pipe(fs.createWriteStream(filePath));

        // Write stock information to the PDF
        doc.fontSize(18).text('Reporte de Stock', { align: 'center' }).moveDown();
        stockItems.forEach(item => {
            doc.fontSize(14).text(`Product: ${item.Producto}`);
            doc.fontSize(12).text(`Drug: ${item.Droga}`);
            doc.fontSize(12).text(`Action: ${item.Accion}`);
            doc.fontSize(12).text(`Quantity: ${item.Cantidad}`);
            doc.fontSize(12).text(`Expiry Date: ${item.Vencimiento}`);
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
