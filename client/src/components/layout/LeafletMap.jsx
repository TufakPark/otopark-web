import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function LeafletMap() {
  const [mapData, setMapData] = useState();
  const [markerData, setMarkerData] = useState();

  const leafletMap = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
  };

  useEffect(() => {
    const getMapDataFromDB = async () => {
      const mapDataFromDB = await axios.get('/parks', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      });

      setMapData(mapDataFromDB.data);
    };

    getMapDataFromDB();
  }, []);

  const handleClickMarker = (e) => {
    console.log(e);
    mapData.parks.forEach((_, idx) => {
      if (mapData.parks[idx].location.latlng !== undefined) {
        if (
          mapData.parks[idx].location.latlng.latitude === e.latlng.lat &&
          mapData.parks[idx].location.latlng.longitude === e.latlng.lng
        ) {
          setMarkerData((previous) => mapData.parks[idx]);
        }
      }
    });
  };

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
        <h6>(BUTTON)Tarih seçtikten sonra, Ödeme butonu</h6>
      </div>
      <MapContainer id='map' center={defaultLatLng} zoom={zoom}>
        <TileLayer
          url={leafletMap.url}
          attribution={leafletMap.attribution}
        ></TileLayer>
        {mapData
          ? mapData.parks.map((position, idx) =>
              mapData.parks[idx].location.latlng ? (
                <Marker
                  key={`marker-${idx}`}
                  position={[
                    mapData.parks[idx].location.latlng.latitude,
                    mapData.parks[idx].location.latlng.longitude,
                  ]}
                  eventHandlers={{
                    click: (e) => {
                      handleClickMarker(e);
                    },
                  }}
                >
                  <Popup>
                    <span>{mapData.parks[idx].price}₺</span>
                  </Popup>
                </Marker>
              ) : null
            )
          : null}
      </MapContainer>
    </div>
  );
}
