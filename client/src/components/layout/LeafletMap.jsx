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
    mapData.parks.forEach((value) => {
      if (value.location.latlng !== undefined) {
        if (
          value.location.latlng.latitude === e.latlng.lat &&
          value.location.latlng.longitude === e.latlng.lng
        ) {
          setMarkerData((previous) => value);
        }
      }
    });
  };

  const handleSearchChange = () => {};

  const renderSearchResult = () => {
    return markerData ? (
      <>
        <div className='values'>
          <div className='data-name-price'>
            <div>
              <h3 className='map-text'>Otopark Adı</h3>
              <h4 className='map-text'>{markerData.name}</h4>
            </div>
            <div>
              <h3 className='map-text'>Ücret</h3>
              <h4 className='map-text'>{markerData.price}₺</h4>
            </div>
          </div>
          <br />
          <h3 className='map-text'>Günler - Saatler</h3>
          {markerData.availabletimes.map((value, idx) => {
            return (
              <h4 className='map-text' key={`item-${idx}`}>
                {value.day}{' '}
                <span className='map-text ml-auto'>
                  {value.times[0]}-{value.times[1]}
                </span>
              </h4>
            );
          })}
          <br />
          <h3 className='map-text'>Yorumlar</h3>
          {markerData.comments.length === 0 ? (
            <h5 className='map-text'>Henüz bir yorum yapılmamış</h5>
          ) : (
            markerData.comments.map((value, idx) => {
              return (
                <h4 className='map-text' key={`item-${idx}`}>
                  {value}
                </h4>
              );
            })
          )}
        </div>
        <button className='search-rent-button'>Kirala</button>
      </>
    ) : (
      <h6 className='map-text'>
        Gösterilecek Otopark Bilgisi Bulunmamaktadır. Arama yapınız veya
        haritadaki işaretli yerlere tıklayınız.
      </h6>
    );
  };

  // TODO: will get this data from the api
  const defaultLatLng = [39.753969419858294, 30.494613058147163];
  const zoom = 13;

  return (
    <div className='map-container'>
      <div className='map-search'>
        <hr className='mtb-1r-2r' />
        <input
          className='map-search-input'
          type='text'
          placeholder='Otopark ara...'
          onChange={handleSearchChange}
        />
        <hr className='mtb-2r' />
        {renderSearchResult()}
      </div>
      <MapContainer id='map' center={defaultLatLng} zoom={zoom}>
        <TileLayer
          url={leafletMap.url}
          attribution={leafletMap.attribution}
        ></TileLayer>
        {mapData
          ? mapData.parks.map((value, idx) =>
              value.location.latlng ? (
                <Marker
                  key={`marker-${idx}`}
                  position={[
                    value.location.latlng.latitude,
                    value.location.latlng.longitude,
                  ]}
                  eventHandlers={{
                    click: (e) => {
                      handleClickMarker(e);
                    },
                  }}
                >
                  <Popup>
                    <span>{value.price}₺</span>
                  </Popup>
                </Marker>
              ) : null
            )
          : null}
      </MapContainer>
    </div>
  );
}
