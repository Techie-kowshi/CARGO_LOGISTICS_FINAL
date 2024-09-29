const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/logistics', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const shipmentRoutes = require('./shipmentRoutes'); // Corrected Path
const reviewRoutes = require('./reviewRoutes'); // Corrected Path

app.use('/api/shipments', shipmentRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
