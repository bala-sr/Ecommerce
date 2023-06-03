import React from 'react';
import "./styles.css";

function CategoriesItem({ title, imageUrl }) {
  return (
    <div className="category-container">
      <div className="bg-image" style={{backgroundImage: `url(${imageUrl})`}} />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoriesItem