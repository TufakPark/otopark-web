import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DateTimePicker from 'react-datetime-picker';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function LeafletMap() {
  const [mapData, setMapData] = useState();
  const [markerData, setMarkerData] = useState();

  const [startValue, startOnChange] = useState(new Date());
  const [endValue, endOnChange] = useState(new Date());

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

  const handleRentingButton = () => {
    try {
      const start = String(startValue).split(' ');
      const end = String(endValue).split(' ');
      console.log(start, '\n', end);
    } catch (err) {
      console.log(err);
    }
  };

  const renderSearchResult = () => {
    return markerData ? (
      <>
        <div className='values'>
          <div className='data-name-price-date'>
            <div className='data-name-price'>
              <div className='data-name'>
                <h4>Otopark Adı</h4>
                <h5>{markerData.name}</h5>
              </div>
              <div className='data-price'>
                <h4>Ücret</h4>
                <h5>{markerData.price}₺</h5>
              </div>
            </div>
            <div className='data-date'>
              <h4>Günler - Saatler</h4>
              {markerData.availabletimes.map((value, idx) => {
                return (
                  <h5 key={`time-key-${idx}`}>
                    {value.day}{' '}
                    <span className='ml-auto' key={`time-span-key-${idx}`}>
                      {value.times[0]}-{value.times[1]}
                    </span>
                  </h5>
                );
              })}
            </div>
          </div>
          <br />
          <h4>Yorumlar</h4>
          {markerData.comments.length === 0 ? (
            <h6>Henüz bir yorum yapılmamıştır</h6>
          ) : (
            markerData.comments.map((value, idx) => {
              return (
                <h5 className='map-text' key={`comment-key-${idx}`}>
                  {value}
                </h5>
              );
            })
          )}
        </div>
        <br />
        <div className='data-start-end-time'>
          <DateTimePicker onChange={startOnChange} value={startValue} />
          <DateTimePicker onChange={endOnChange} value={endValue} />
        </div>
        <button className='search-rent-button' onClick={handleRentingButton}>
          Kirala
        </button>
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
                  key={`marker-key-${idx}`}
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
                  <Popup key={`marker-popup-key-${idx}`}>
                    <span key={`marker-span-key-${idx}`}>{value.price}₺</span>
                  </Popup>
                </Marker>
              ) : null
            )
          : null}
      </MapContainer>
    </div>
  );
}
