import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

const CheckboxWrapper = ({ name, label, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const configCheckbox = {
    ...field,
    ...otherProps,
  };

  function handleCheck(val)  {
    helpers.setValue(val.target.checked)
  }

  return (
    <FormControlLabel
      control={<Checkbox checked={field.value} {...configCheckbox} onChange={handleCheck} />}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ''}
    />
  );
};

export default CheckboxWrapper;