import React from "react"
import ReactDOMServer from 'react-dom/server';
import Leaflet from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Map({ position, zoom, icon, homePosition = [46.878946414834765, -0.6522204475188746] }: { position: [number, number], zoom: number, icon?: any, homePosition?: [number, number] }) {
  const customMarkerIcon = icon ? new Leaflet.DivIcon({
    html: ReactDOMServer.renderToString(<FontAwesomeIcon icon={icon} />),
    iconSize: [32, 32],
    iconAnchor: [10,10],
  }) : undefined;

  const nayMarkerIcon = new Leaflet.DivIcon({
    html: ReactDOMServer.renderToString(<FontAwesomeIcon icon={faHome} />),
    iconSize: [32, 32],
    iconAnchor: [10,10],
  });

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { customMarkerIcon && <Marker position={position} icon={customMarkerIcon} /> }
      <Marker position={homePosition} icon={nayMarkerIcon}>
        <Popup>
          Le Hameau du Nay<br />8 Le Nay, 79140 Le Pin
        </Popup>
      </Marker>
    </MapContainer>
  )
}
