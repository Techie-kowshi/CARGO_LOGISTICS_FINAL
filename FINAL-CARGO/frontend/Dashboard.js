import React from 'react';
import DeliveryUpdates from '../components/DeliveryUpdates';
import Reviews from '../components/Reviews';
import Services from '../components/Services';
import ShipmentStacking from '../components/ShipmentStacking';

const Dashboard = () => {
  return (
    <div>
      <h1>Logistic Dashboard</h1>
      <ShipmentStacking />
      <Services />
      <DeliveryUpdates />
      <Reviews />
    </div>
  );
};

export default Dashboard;
