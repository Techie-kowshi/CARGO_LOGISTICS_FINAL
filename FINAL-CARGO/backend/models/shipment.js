const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  trackingNumber: String,
  status: String,
  origin: String,
  destination: String,
  currentLocation: String,
  expectedDelivery: Date,
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
