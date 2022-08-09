import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../index.css";

const Map = ({ latitude, longitude, name, address }) => {
  if (!latitude || !longitude || !name || !address) {
    return <p>No map avaliable.</p>;
  }

  const position = [latitude, longitude];

  return (
    <div className="container text-center p-4">
      <h4>Map</h4>
      <div class="d-flex justify-content-center">
        <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {name}
              <br />
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
