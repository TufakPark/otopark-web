import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../context/UserContext';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function LeafletMap() {
  const { userData } = useContext(UserContext);

  const [mapData, setMapData] = useState();

  const leafletMap = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
  };

  /*const getPromisedData = async () => {
    const response = await axios.get("https://nominatim.openstreetmap.org/search?q=eskisehir+ugurbey+sokak+25&format=json&polygon=1&addressdetails=1");

    console.log(response.data[0].lat);
  };*/

  /* getPromisedData();*/

  // TODO: will get this data from the api
  const defaultLatLng = [39.753969419858294, 30.494613058147163];
  const zoom = 13;

  return (
    <div className='map-container'>
      <div className='map-search'>
        <h5>TODO: Bilgiler veritabanından alınıp burada gösterilecek</h5>
        <h6>(SEARCH BOX)Arama yeri</h6>
        <hr />
        <h6>(TEXT)Otopark adı</h6>
        <h6>(IMAGES)Varsa Resimleri</h6>
        <h6>(DATE)Uygun Oldugu Saat ve Günler</h6>
        <h6>(TEXT)Saatlik ücreti</h6>
        <h6>(LOTS OF TEXTS)Yorumları - Yıldız Sayısı</h6>
        <h6>(BUTTON)Tarih seçtikten sonra > Ödeme butonu</h6>
      </div>
      <MapContainer id='map' center={defaultLatLng} zoom={zoom}>
        <TileLayer
          url={leafletMap.url}
          attribution={leafletMap.attribution}
        ></TileLayer>
      </MapContainer>
    </div>
  );
}
