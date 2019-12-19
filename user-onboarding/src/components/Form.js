import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({

  values,
  errors,
  touched,
  status
}) => {
  console.log('values', values);
  console.log('errors', errors);
  console.log('touched', touched);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(
      'status has changed!',
      status
    );

    status &&
    setUsers(users => [
      ...users,
      status
    ]);
  }, [status]);

  return (
    <div className='user-form'>
      <Form>
        <label htmlFor='name'>
          Name
          <Field
            id='name'
            type='text'
            name='name'
            placeholder='Name'/>
          {touched.name && 
          errors.name && (
            <p className='errors'>
              {errors.name}
            </p>
          )}
        </label>

        <label htmlFor='email'>
          Name
          <Field
            id='email'
            type='email'
            name='email'
            placeholder='Email address'/>
          {touched.email && 
          errors.email && (
            <p className='errors'>
              {errors.email}
            </p>
          )}
        </label>

        <label htmlFor='password'>
          Name
          <Field
            id='password'
            type='password'
            name='password'
            placeholder='Password'/>
          {touched.password && 
          errors.password && (
            <p className='errors'>
              {errors.password}
            </p>
          )}
        </label>

        <label className='terms-of-service'>
          Terms of Service
          <Field
            type='checkbox'
            name='terms'
            checked = {values.terms} />
            <span className='checkmark' />
        </label>

        <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}

export default UserForm;