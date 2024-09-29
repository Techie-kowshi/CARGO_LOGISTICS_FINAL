import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';

// Custom pointer icon for the warehouses
const warehouseIcon = L.icon({
  iconUrl: 'https://as1.ftcdn.net/v2/jpg/02/74/71/40/1000_F_274714060_Xdo2qN8qEUE3LFemiN03ZlaOIbwff3c3.jpg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const warehouseData = [
  { id: 1, name: 'Amazon Warehouse USA', lat: 37.7749, lng: -122.4194, mob_num: '+1-555-0101', email_addr: 'contact@amazon.com' },
  { id: 2, name: 'Alibaba Warehouse China', lat: 31.2304, lng: 121.4737, mob_num: '+86-555-0202', email_addr: 'contact@alibaba.com' },
  { id: 3, name: 'Flipkart Warehouse India', lat: 12.9716, lng: 77.5946, mob_num: '+91-555-0303', email_addr: 'contact@flipkart.com' },
  { id: 4, name: 'eBay Warehouse UK', lat: 51.5074, lng: -0.1278, mob_num: '+44-555-0404', email_addr: 'contact@ebay.com' },
  { id: 5, name: 'Rakuten Warehouse Japan', lat: 35.6895, lng: 139.6917, mob_num: '+81-555-0505', email_addr: 'contact@rakuten.com' },
  { id: 6, name: 'Zalando Warehouse Germany', lat: 52.5200, lng: 13.4050, mob_num: '+49-555-0606', email_addr: 'contact@zalando.com' },
  { id: 7, name: 'Shopify Warehouse Canada', lat: 45.4215, lng: -75.6972, mob_num: '+1-555-0707', email_addr: 'contact@shopify.com' },
  { id: 8, name: 'ASOS Warehouse Australia', lat: -33.8688, lng: 151.2093, mob_num: '+61-555-0808', email_addr: 'contact@asos.com' },
  { id: 9, name: 'JD Warehouse UK', lat: 51.509865, lng: -0.118092, mob_num: '+44-555-0909', email_addr: 'contact@jd.com' },
  { id: 10, name: 'Otto Warehouse Germany', lat: 53.5511, lng: 9.9937, mob_num: '+49-555-1010', email_addr: 'contact@otto.com' },
];

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mapInstance = L.map('map', {
      center: [20.5937, 78.9629],
      zoom: 2,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      const filteredWarehouses = warehouseData.filter((warehouse) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          warehouse.name.toLowerCase().includes(searchLower) ||
          warehouse.lat.toString().includes(searchLower) ||
          warehouse.lng.toString().includes(searchLower)
        );
      });

      filteredWarehouses.forEach((warehouse) => {
        const marker = L.marker([warehouse.lat, warehouse.lng], { icon: warehouseIcon }).addTo(map);
        marker.bindPopup(`
          <h3>${warehouse.name}</h3>
          <p><strong>Location:</strong> ${warehouse.lat}, ${warehouse.lng}</p>
          <p><strong>Contact:</strong> ${warehouse.mob_num}</p>
          <p><strong>Email:</strong> ${warehouse.email_addr}</p>
        `).on('click', () => {
          setSelectedWarehouse(warehouse);
        });
      });
    }
  }, [map, searchTerm]);

  return (
    <div>
      <div id="map" style={mapContainerStyle}></div>
      <input
        type="text"
        placeholder="Search by warehouse name, latitude, or longitude"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {selectedWarehouse && (
        <div className="warehouse-info">
          <h3>{selectedWarehouse.name}</h3>
          <p><strong>Location:</strong> {selectedWarehouse.lat}, {selectedWarehouse.lng}</p>
          <p><strong>Contact:</strong> {selectedWarehouse.mob_num}</p>
          <p><strong>Email:</strong> {selectedWarehouse.email_addr}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
