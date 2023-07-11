import React from 'react';
import SignUpForm from '../../components/signupForm';
import SignInForm from '../../components/signInForm';
import './styles.css';

function Authentication() {
  return (
    <div className='auth-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;