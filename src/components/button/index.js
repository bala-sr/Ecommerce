import React from 'react';
import './styles.css';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  dark: 'btn-dark',
  light: 'btn-light'
}

function Button({ children, buttonType, ...otherProps }) {
  return (
    <button 
    className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    {...otherProps}
    >
      { children }
    </button>
  )
}

export default Button;