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
}

export default UserForm;