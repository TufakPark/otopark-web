import React from 'react';

export default function LandingPageCards() {
  return (
    <>
      <div className='container card-page'>
        <div className='card'>
          <h2 className='card-title'>Ücretli Otopark</h2>
          <h4 className='card-body'>
            Ücretli Otopark hakkında kısa bir bilgi...
          </h4>
        </div>
        <div className='card'>
          <h2 className='card-title'>Gümüş Paket</h2>
          <h4 className='card-body'>Gümüş Pake hakkında kısa bir bilgi...</h4>
        </div>
        <div className='card'>
          <h2 className='card-title'>Altın Paket</h2>
          <h4 className='card-body'>Altın Paket hakkında kısa bir bilgi...</h4>
        </div>
        <div className='card'>
          <h2 className='card-title'>Elmas Paket</h2>
          <h4 className='card-body'>Elmas Paket hakkında kısa bir bilgi...</h4>
        </div>
      </div>
    </>
  );
}
