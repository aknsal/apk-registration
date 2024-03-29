import React from 'react';
import {TextField } from '@mui/material';
import { useField } from 'formik';

const TextfieldWrapper = ({
  name,
  children,
  ...otherProps
}) => {
  const [field, mata] = useField(name);

  // if(field.form){
  //   const waringMessage = field.form.organiserWarning
  //   console.log(waringMessage);
  // }
 

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <TextField {...configTextfield}>
      {children}
    </TextField>
  );
};

export default TextfieldWrapper;