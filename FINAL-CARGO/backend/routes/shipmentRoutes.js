const express = require('express');
const Shipment = require('../models/shipment');
const router = express.Router();

// Get all shipments
router.get('/', async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
});

// Get single shipment by tracking number
router.get('/:trackingNumber', async (req, res) => {
  const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber });
  res.json(shipment);
});

module.exports = router;
