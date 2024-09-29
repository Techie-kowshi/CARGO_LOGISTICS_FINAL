import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShipmentStacking = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shipments')
      .then(res => setShipments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Shipment Stacking</h2>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.trackingNumber}>
            {shipment.origin} ➔ {shipment.destination} - Status: {shipment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentStacking;
