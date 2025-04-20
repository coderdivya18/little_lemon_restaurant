import React,{useState} from 'react'

const BookingForm=(props) =>{
     const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
    const [occasion, setOccasion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.SubmitForm(e)
    }

    const handleOnChange = (e) => {
        setDate(e);
        props.dispatch(e)
    }
    
  return (
    <form className='booking-form-container' onSubmit={handleSubmit}>
          <h2>Book a table</h2>
          <div className='booking-form'>
           
               <div>
                <label htmlFor="res-date">Choose date :</label>
                <input type="date" id="res-date" required value={date}
                onChange={(e) => handleOnChange(e.target.value)}/>
              </div>
              
               <div>
                  <label htmlFor="res-time">Choose time :</label>
                  <select id="res-time "
                      value={time}
                onChange={(e) => setTime(e.target.value)}>
                      {props.availableTimes.availableTimes.map((availableTimes) => {
                  return <option key={availableTimes}>{availableTimes}</option>;
                })}
                  </select>
              </div>
              
               <div>
                  <label htmlFor="guests">Number of guests :</label>
                  <input type="number" placeholder="1" min="1" max="10" id="guests" value={guest}
                onChange={(e) => setGuest(e.target.value)}/>
              </div>
              
               <div>
                   <label htmlFor="occasion">Occasion</label>
                       <select id="occasion" value={occasion} onChange={(e)=>setOccasion(e.target.value)}>
                       <option>Birthday</option>
                       <option>Anniversary</option>
                       <option>Engagement</option>
                        <option>General</option>
                       </select>
              </div>

              <div className='btnReceive'>
                   <input type="submit" value="Make Your reservation" className='reserve-table-btn' aria-label='on Click' />
              </div>
             
              </div>
</form>
  )
}


export default BookingForm