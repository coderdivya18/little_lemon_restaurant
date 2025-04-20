import React, { useState } from "react";

const BookingForm = (props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.SubmitForm(e);
    setDate("");
    setTime("");
    setGuest("");
    setOccasion("");
  };
  const handleOnChange = (e) => {
    setDate(e);
    props.dispatch(e);
  };
  return (
    <header>
      <section className="booking-form-container">
        <h2>Book a table</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div>
            <label htmlFor="book-date">Choose Date:</label>
            <input
              id="book-date"
              value={date}
              type="date"
              required
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </div>
          {/*  for time selection */}

          <div>
            <label htmlFor="book-time">Choose Time:</label>
            <select
              id="book-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select a Time</option>
              {props.availableTimes?.availableTimes?.map((availableTimes) => {
                return <option key={availableTimes}>{availableTimes}</option>;
              })}
            </select>
          </div>

          {/* for number of guests */}

          <div>
            <label htmlFor="book-guests">Number of guests:</label>
            <input
              type="text"
              id="book-guests"
              min={1}
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>

          {/* For Ocassion */}

          <div>
            <label htmlFor="book-occasion">Occasion:</label>
            <select
              id="book-occasion"
              key={occasion}
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option>Birthday</option>
              <option>Anniversary</option>
            </select>
          </div>

          {/* for Submit Button */}
          <div className="reserve-table-btn">
            <button
              aria-label="Submit reservation request"
              type="submit"
              data-testid="reservation-submit-button"
            >
              Make a reservation
            </button>
          </div>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;
