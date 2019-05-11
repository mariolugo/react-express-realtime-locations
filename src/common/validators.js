export const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } 

  if (!values.description) {
    errors.description = "Description is required";
  } 

  if (!values.latitude) {
    errors.latitude = "Latitude is required";
  }  else if (!/^-?([0-8]?[0-9]|[0-9]0)\.{1}\d{1,20}$/i.test(values.latitude)) {
    errors.latitude = "Latitude must be a valid"
  }

  if (!values.longitude) {
    errors.longitude = "Longitude is required";
  } else if (!/^-?([1]?[0-7][0-9]|[1]?[0-8][0]|[0-9]?[0-9])\.{1}\d{1,20}$/i.test(values.longitude)) {
    errors.longitude = "Longitude must be a valid"
  }

  if (typeof values.status === 'undefined') {
      errors.status = "Status is required";
  }
  return errors;
};
