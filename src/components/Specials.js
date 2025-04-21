import React from 'react';
import recipes from '../assets/recipes'; 

export default function Specials() {
   const handleOrder = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    alert(`You have ordered ${recipe.title}`);
  };


  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>This week Specials!</h2>
        <button>Order Menu</button>
      </div>

      {/* menu-card */}
      <div className="cards">
        {recipes.map(({ id, title, image, price, description }) => {
          return (
            <div key={id} className="menu-items">
              <img src={image} alt={title} />
              <div className="menu-content">
                <div className="heading">
                  <h2>{title}</h2>
                  <p id='price'>${price}</p>
                </div>
                <p>{description}</p>
                <button
                  className="orderbtn"
                  onClick={() => handleOrder(id, title)}
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  )
}
