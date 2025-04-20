import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';
import ConfirmedBooking from './ConfirmedBooking';

export default function Main() {
return (
    <main>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/booking"
          element={
            <Booking
              // availableTimes={state}
              // dispatch={dispatch}
              // SubmitForm={SubmitForm}
            />
          }
        />
        <Route path="/" element={<Header />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
 
}
