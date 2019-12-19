import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './../App.css';

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
      <Form className='form'>
        <label htmlFor='name' className='name'>
          Name:
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

        <label htmlFor='email' className='email'>
          Email: 
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

        <label htmlFor='password' className='password'>
          Password:
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

        <label className='role'>
          Role:
          <Field
            as='select'
            className='role-select'
            name='select'>
              <option disabled>
                Choose Your Role
              </option>
              <option value='None'>
                None
              </option>
              <option value='ux'>
                UX
              </option>
              <option value='data-analyst'>
                Data Analyst
              </option>
              <option value='data-scientist'>
                Data Scientist
              </option>
              <option value='front-end'>
                Front-End Developer
              </option>
              <option value='back-end'>
                Back-End Developer
              </option>
              <option value='full-stack'>
                Full-Stack Developer
              </option>
              <option value='team-lead'>
                Team-Lead
              </option>
            </Field>

        </label>

        <label className='terms'>
          Terms of Service
          <Field
            type='checkbox'
            name='terms'
            checked = {values.terms} />
            <span className='checkmark' />
        </label>

        <button type='submit'>Submit</button>
      </Form>

      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>
              Name: {user.name}
            </li>
            <li>
              Email: {user.email}
            </li>
            <li>
              Password: {user.password}
            </li>
            <li>Role: {user.role}</li>
          </ul>
        )
      })}

    </div>
  )
};

const FormikUserForm = withFormik({

  mapPropsToValues(props) {

    return {
      name: props.name || '',
      email: props.email || '',
      password: props.password || '',
      role: props.role || '',
      terms: props.terms || false  
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit(
    values,
    { setStatus, resetForm }
  ) {

    console.log('submitting', values);

    axios
      .post(
        'https://reqres.in/api/users',
        values
      )
      .then(response => {
        console.log('success', response);

        setStatus(response.data);

        resetForm();
      })
      .catch(error => 
        console.log(error.respomse)
      );
  }
})(UserForm);

export default FormikUserForm;