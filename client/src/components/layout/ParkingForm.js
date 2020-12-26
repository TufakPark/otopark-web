import React, { useState } from 'react';

import ErrorNotice from "../misc/ErrorNotice";

export default function ParkingForm() {

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [capacity, setCapacity] = useState();
  const [cartype, setCarType] = useState();
  const [price, setPrice] = useState();
  const [subscription, setSubscription] = useState();
  const [availabletimes, setAvailableTimes] = useState();

  const [error, setError] = useState();

  // TODO: DO SUBMIT HERE... WHAT ARE YOU WAITING FOR?
  const submit = async (e) => {
    e.preventDefault();

    try {

    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form profile-form" onSubmit={submit}>
        <label htmlFor="parking-name">Otopark ismi</label>
        <input
          id="parking-name"
          type="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="parking-address">Adres</label>
        <input
          id="parking-address"
          type="address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="parking-capacity">Kapasite</label>
        <input
          id="parking-capacity"
          type="capacity"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="parking-cartype">Bulunacak Araba Tipi</label>
        <input
          id="parking-cartype"
          type="cartype"
          onChange={(e) => setCarType(e.target.value)}
        />

        <label htmlFor="parking-price">Ücret</label>
        <input
          id="parking-price"
          type="price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="parking-subscription">Paket Seçimi</label>
        <input
          id="parking-subscription"
          type="subscription"
          placeholder="1: Ücretli Otopark | 2: Gümüş Paket | 3: Altın Paket | 4: Elmas Paket"
          onChange={(e) => setSubscription(e.target.value)}
        />

        <label htmlFor="parking-availabletimes">Kullanım Günleri ve Saatleri</label>
        <input
          id="parking-availabletimes"
          type="availabletimes"
          onChange={(e) => setAvailableTimes(e.target.value)}
        />

        <input type="submit" value="Ekle" />
      </form>
    </>
  )
}
