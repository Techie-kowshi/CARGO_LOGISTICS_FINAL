import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DeliveryUpdates = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shipments')
      .then(res => setShipments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Delivery Updates</h2>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.trackingNumber}>
            {shipment.currentLocation} ➔ Expected Delivery: {new Date(shipment.expectedDelivery).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryUpdates;
