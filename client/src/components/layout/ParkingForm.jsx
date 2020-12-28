import React, { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../context/UserContext';

export default function ParkingForm(props) {
  const { userData } = useContext(UserContext);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [capacity, setCapacity] = useState();
  const [cartype, setCarType] = useState();
  const [price, setPrice] = useState();
  const [subscription, setSubscription] = useState();
  const [day, setDay] = useState();
  const [starttime, setStartTime] = useState();
  const [endtime, setEndTime] = useState();

  const getPromisedData = async (data) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${data}&format=json&polygon=1&addressdetails=1`
    );

    return response.data[0];
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const latlng = address.split(' ').join('+');

      const data = await getPromisedData(latlng);

      if (data !== null) {
        const park = {
          userid: userData.user.id,
          name: name,
          location: {
            address: address,
            latlng: {
              latitude: data.lat,
              longitude: data.lon,
            },
          },
          capacity: capacity,
          cartype: cartype,
          price: price,
          carsnumber: 0,
          subscription: subscription,
          availabletimes: {
            day: day,
            times: [starttime, endtime],
          },
        };

        await axios
          .post('/parks/add', park, {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('auth-token'),
            },
          })
          .catch((error) => console.log(error.response));

        props.successMessage('Otopark ekleme işlemi başarıyla tamamlandı');
      } else {
        props.errorMessage('Lutfen adresinizi dogru giriniz');
      }
    } catch (err) {
      err.response && props.errorMessage(err.response);
    }
  };

  // TODO: There must be an option to select multiple days

  return (
    <>
      <form className='form profile-form' onSubmit={submit}>
        <label htmlFor='parking-name'>Otopark ismi</label>
        <input
          id='parking-name'
          type='name'
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='parking-address'>Adres</label>
        <input
          id='parking-address'
          type='address'
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor='parking-capacity'>Kapasite</label>
        <input
          id='parking-capacity'
          type='capacity'
          onChange={(e) => setCapacity(e.target.value)}
        />

        <label htmlFor='parking-cartype'>Bulunacak Araba Tipi</label>
        <input
          id='parking-cartype'
          type='cartype'
          onChange={(e) => setCarType(e.target.value)}
        />

        <label htmlFor='parking-price'>Ücret</label>
        <input
          id='parking-price'
          type='price'
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor='parking-subscription'>Paket Seçimi</label>
        <input
          id='parking-subscription'
          type='subscription'
          placeholder='1: Ücretli Otopark | 2: Gümüş Paket | 3: Altın Paket | 4: Elmas Paket'
          onChange={(e) => setSubscription(e.target.value)}
        />

        <label htmlFor='parking-day'>Kullanım Günü</label>
        <input
          id='parking-day'
          type='day'
          onChange={(e) => setDay(e.target.value)}
        />

        <label htmlFor='parking-starttime'>Başlangıç Saati</label>
        <input
          id='parking-starttime'
          type='starttime'
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label htmlFor='parking-endtime'>Bitiş Saati</label>
        <input
          id='parking-endtime'
          type='endtime'
          onChange={(e) => setEndTime(e.target.value)}
        />

        <input type='submit' value='Ekle' />
      </form>
    </>
  );
}
