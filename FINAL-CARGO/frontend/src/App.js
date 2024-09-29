import { default as React, useState } from 'react';
import './App.css';
import MapComponent from './MapComponent'; // Ensure the path is correct

function App() {
  const [shipments, setShipments] = useState([
    { id: 1, trackingNumber: 'ABC123', name: 'Shipment 1', status: 'In Transit', review: 'Excellent service' },
    { id: 2, trackingNumber: 'DEF456', name: 'Shipment 2', status: 'Delivered', review: 'Delivered on time' },
  ]);
  const [newReview, setNewReview] = useState({});
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedShipment, setTrackedShipment] = useState(null);
  const [error, setError] = useState('');
  const [newShipment, setNewShipment] = useState({ id: '', trackingNumber: '', name: '', status: 'In Transit' });

  const handleTrackShipment = () => {
    const shipment = shipments.find(s => s.trackingNumber === trackingNumber);
    if (shipment) {
      setTrackedShipment(shipment);
      setError('');
    } else {
      setTrackedShipment(null);
      setError('No shipment found for the entered tracking number.');
    }
  };

  const updateStatus = (id, status) => {
    setShipments(shipments.map(shipment =>
      shipment.id === id ? { ...shipment, status } : shipment
    ));
  };

  const handleReviewChange = (id, value) => {
    setNewReview({ ...newReview, [id]: value });
  };

  const addReview = (id) => {
    setShipments(shipments.map(shipment =>
      shipment.id === id ? { ...shipment, review: newReview[id] || '' } : shipment
    ));
    setNewReview({ ...newReview, [id]: '' }); // Clear the input after submitting
  };

  const handleAddShipment = () => {
    const existingShipment = shipments.find(s => s.id === parseInt(newShipment.id));
    if (existingShipment) {
      setError('Shipment ID already exists.');
    } else {
      setShipments([...shipments, newShipment]);
      setNewShipment({ id: '', trackingNumber: '', name: '', status: 'In Transit' });
      setError('');
    }
  };

  const handleDeleteShipment = (id) => {
    setShipments(shipments.filter(shipment => shipment.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-container">
          <h1>TrackLynk</h1>
          <nav>
            <a href="#track">Track Shipment</a>
            <a href="#updates">Shipment Updates</a>
            <a href="#reviews">Customer Feedback</a>
            <a href="#services">Our Services</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Track Shipment Section */}
      <section id="track">
        <h2>Track Your Shipment</h2>
        <div className="tracking-form">
          <input
            type="text"
            placeholder="Enter Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button onClick={handleTrackShipment}>Track Now</button>
        </div>
        {trackedShipment && (
          <div className="shipment-info">
            <h3>{trackedShipment.name}</h3>
            <p>Status: {trackedShipment.status}</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </section>

      {/* Add New Shipment Section */}
      <section id="add-shipment">
        <h2>Add New Shipment</h2>
        <div className="add-shipment-form">
          <input
            type="number"
            placeholder="Shipment ID"
            value={newShipment.id}
            onChange={(e) => setNewShipment({ ...newShipment, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tracking Number"
            value={newShipment.trackingNumber}
            onChange={(e) => setNewShipment({ ...newShipment, trackingNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            value={newShipment.name}
            onChange={(e) => setNewShipment({ ...newShipment, name: e.target.value })}
          />
          <button onClick={handleAddShipment}>Add Shipment</button>
        </div>
        {error && <p className="error">{error}</p>}
      </section>

      {/* Shipment Updates Section */}
      <section id="updates">
        <h2>Shipment Updates</h2>
        <ul className="shipment-list">
          {shipments.map((shipment) => (
            <li key={shipment.id}>
              <strong>{shipment.name}</strong><br />
              Status: {shipment.status}<br />
              <button onClick={() => updateStatus(shipment.id, 'Dispatched')}>Mark as Dispatched</button>
              <button onClick={() => updateStatus(shipment.id, 'Delivered')}>Mark as Delivered</button>
              {shipment.status === 'Delivered' && (
                <button onClick={() => handleDeleteShipment(shipment.id)}>Delete Shipment</button>
              )}
            </li>
          ))}
        </ul>
        <h2>Warehouse Locations</h2>

      </section>

      {/* Map Component Section */}
      <section id="map">
        <MapComponent />
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <h2>Customer Feedback</h2>
        <ul className="review-list">
          {shipments.map((shipment) => (
            <li key={shipment.id}>
              <strong>{shipment.name}</strong><br />
              Review: {shipment.review || 'No review'}<br />
              <input
                type="text"
                placeholder="Add a review"
                value={newReview[shipment.id] || ''}
                onChange={(e) => handleReviewChange(shipment.id, e.target.value)}
              />
              <button onClick={() => addReview(shipment.id)}>Submit Review</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Services Section */}
      <section id="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-card">
            <h3>Global Shipping</h3>
            <p>Reliable international shipment with tracking.</p>
          </div>
          <div className="service-card">
            <h3>Warehouse Solutions</h3>
            <p>Efficient and secure storage for all cargo sizes.</p>
          </div>
          <div className="service-card">
            <h3>Express Delivery</h3>
            <p>Fast delivery service for urgent shipments.</p>
          </div>
        </div>
      </section>  

      {/* Footer */}
      <footer>
        <p>© 2024 TrackLynk. All Rights Reserved. | <a href="#privacy">Privacy Policy</a></p>
      </footer>
    </div>
  );
}

export default App;
