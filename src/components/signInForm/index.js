import React, { useState } from 'react';
import { message } from 'antd';
import { createAuthUserwithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserwithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase';
import FormInput from '../formInput';
import Button from '../button';
import './styles.css';

function SignInForm() {
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormFields({
      ...formFields, [name]: value
    });
  };

  //Clearing all form fields after successful signup
  const resetFormFields = () => {
    setFormFields({
      email: '',
      password: ''
    });
  }

  //Handle signup form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signInAuthUserwithEmailAndPassword(formFields.email, formFields.password);
      console.log(response);
      resetFormFields();
    } catch(err) {
      switch(err.code) {
        case 'auth/user-not-found':
          message.error('User does not exist.');
          break;
        case 'auth/wrong-password':
          message.error('Incorrect password.');
          break;
        default:
          console.log(err);
          break;
      }
    }
  } 

  return (
    <div className='signin-container'>
      <h1>Already have an account?</h1>
      <h2>Sign In</h2>
      <form onSubmit={handleFormSubmit}>
        <FormInput 
        label='Email' 
        type='email' 
        onChange={handleChange} 
        name='email' 
        value={formFields.email} 
        required
        />

        <FormInput 
        label='Password' 
        type='password' 
        onChange={handleChange} 
        name='password' 
        value={formFields.password} 
        required 
        />
        <div  className='buttons-container'>
          <Button buttonType='dark'>SIGN IN</Button>
          <Button type='button' onClick={logGoogleUser} buttonType='google'>SIGN IN WITH GOOGLE</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;