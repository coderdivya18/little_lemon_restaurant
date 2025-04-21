import React, { useEffect, useState } from "react";

const BookingForm = (props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [occasion, setOccasion] = useState("Birthday");

  // Form validation state
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    guest: "",
  });

  // Validation function
  useEffect(() => {
    validateForm();
  }, [date, time, guest, occasion]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      date: "",
      time: "",
      guest: "",
    };

    // Date validation
    if (!date) {
      newErrors.date = "Date is required";
      isValid = false;
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
        isValid = false;
      }
    }

    // Time validation
    if (!time) {
      newErrors.time = "Time is required";
      isValid = false;
    }

    // Guest validation
    if (!guest) {
      newErrors.guest = "Number of guests is required";
      isValid = false;
    } else if (isNaN(guest) || Number(guest) < 1) {
      newErrors.guest = "Must be at least 1 guest";
      isValid = false;
    } else if (Number(guest) > 10) {
      newErrors.guest = "Maximum 10 guests allowed";
      isValid = false;
    }

    setErrors(newErrors);
    setFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    props.SubmitForm(e);
    setDate("");
    setTime("");
    setGuest("");
    setOccasion("Birthday");
  };

  const handleOnChange = (e) => {
    setDate(e);
    props.dispatch(e);
  };
  return (
    <header>
      <section className="booking-form-container">
        <h2>Book a table</h2>
        <form
          onSubmit={handleSubmit}
          // className="booking-form"
          id={"booking-form"}
        >
          <div>
            <label htmlFor="book-date">Choose Date:</label>
            <input
              id="book-date"
              value={date}
              type="date"
              required
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              onChange={(e) => handleOnChange(e.target.value)}
              aria-invalid={errors.date ? "true" : "false"}
            />
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
          </div>
          
          {/*  for time selection */}

          <div>
            <label htmlFor="book-time">Choose Time:</label>
            <select
              id="book-time"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
              aria-invalid={errors.time ? "true" : "false"}
            >
              <option value="">Select a Time</option>
              {props.availableTimes?.availableTimes?.map((availableTimes) => {
                return <option key={availableTimes}>{availableTimes}</option>;
              })}
            </select>
            {errors.time && (
              <span className="error-message">{errors.time}</span>
            )}
          </div>

          {/* for number of guests */}

          <div>
            <label htmlFor="book-guests">Number of guests:</label>
            <input
              type="number"
              id="book-guests"
              min="1"
              max="10" // Assuming maximum 10 guests
              required
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              aria-invalid={errors.guest ? "true" : "false"}
            />
            {errors.guest && (
              <span className="error-message">{errors.guest}</span>
            )}
          </div>

          {/* For Occassion */}

          <div>
            <label htmlFor="book-occasion">Occasion:</label>
            <select
              id="book-occasion"
              key={occasion}
              value={occasion}
              required
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>

          {/* for Submit Button */}
          <div className="reserve-table-btn">
            <button
              aria-label="Submit reservation request"
              type="submit"
              data-testid="reservation-submit-button"
              disabled={!formValid}
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
