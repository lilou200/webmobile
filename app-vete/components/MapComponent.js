import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';  // Importation des composants de React Leaflet
import { Icon } from 'leaflet'; // Utilisation de l'icône Leaflet pour un marqueur personnalisé
import 'leaflet/dist/leaflet.css'; // Importation du CSS de Leaflet pour afficher correctement la carte

// Coordonnées de la carte (par exemple Londres)
const center = [51.505, -0.09];  // Exemple avec Londres

// Composant MapComponent
const MapComponent = () => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      {/* TileLayer : Le fond de la carte avec OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
    </MapContainer>
  );
};

export default MapComponent;
