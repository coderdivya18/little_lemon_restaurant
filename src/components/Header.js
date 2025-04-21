import React from 'react';
import { Link } from 'react-router-dom'; 
import banner from "../assets/restaurantfood.jpg";

export default function Header() {
  return (
    <header className='header'>      
      <section>
        {/* banner text */}
        <div className="banner">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            We are a family owned Mediterraneran restaurant, focusd on
            traditional recipes served with modern twist.
          </p>
          <Link to="/booking">
            {" "}
            <button aria-label="on Click ">Reserve a Table</button>
          </Link>
        </div>
        
        {/* banner image */}
        <div className="banner-img">
          <img src={banner} alt="banner-image" />
        </div>
      </section>
    </header>
      
   
  )
}
