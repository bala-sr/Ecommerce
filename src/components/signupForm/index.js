import React, { useState } from 'react';
import { message } from 'antd';
import { createAuthUserwithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import FormInput from '../formInput';
import Button from '../button';
import './styles.css';

function SignUpForm() {
  const [formFields, setFormFields] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormFields({
      ...formFields, [name]: value
    });
  };

  //Clearing all form fields after successful signup
  const resetFormFields = () => {
    setFormFields({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  //Handle signup form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(formFields.password === formFields.confirmPassword) {
      try {
        const { user } = await createAuthUserwithEmailAndPassword(formFields.email, formFields.password);
        await createUserDocumentFromAuth(user, { displayName: formFields.displayName });
        resetFormFields();
        message.success("User created successfully!");
      } catch(err) {
        console.log("User signup failed: ", err);
        if(err.code === 'auth/email-already-in-use') {
          message.error("Email already exists. Please login or signup with a new email.");
        }
      }
    } else {
      message.error('Password and Confirm Password do not match!');
      return;
    }
  }

  return (
    <div className='signup-container'>
      <h1>Don't have an account?</h1>
      <h2>SignUp</h2>
      <form onSubmit={handleFormSubmit}>
        <FormInput 
        label='Display Name'
        type='text' 
        onChange={handleChange} 
        name='displayName' 
        value={formFields.displayName} 
        required 
        />

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

        <FormInput 
        label='Confirm Password'
         type='password' 
         onChange={handleChange} 
         name='confirmPassword' 
         value={formFields.confirmPassword} 
         required 
         />

        <Button buttonType='dark'>SIGN UP</Button>
      </form>
    </div>
  )
}

export default SignUpForm;