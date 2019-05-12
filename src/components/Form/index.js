import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";

// Externals
import PropTypes from "prop-types";
import { validate } from "../../common/validators";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

// Material components
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  classes
}) => (
  <TextField
    error={touched && typeof error !== "undefined"}
    id="outlined-error"
    label={label}
    className={classes.textField}
    margin="normal"
    {...input}
    fullWidth
    helperText={touched ? error : ""}
    variant="outlined"
  />
);

const renderSwitchField = ({ input, meta: { touched, error } }) => {
  console.log("input", input);
  return (
    <div>
      <Switch checked={input.value} {...input} onChange={input.onChange} />
    </div>
  );
};

function FormComponent(props) {
  const { classes } = props;
  console.log("props", props);
  return (
    <form>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Location Name"
        classes={classes}
      />
      <Field
        name="description"
        type="text"
        component={renderField}
        label="Description"
        classes={classes}
      />
      <Field
        name="latitude"
        type="text"
        component={renderField}
        label="Latitude"
        classes={classes}
      />
      <Field
        name="longitude"
        type="text"
        component={renderField}
        label="Longitude"
        classes={classes}
      />
      <Typography variant="subtitle1">Is Open?</Typography>
      <Field
        name="status"
        component={renderSwitchField}
        label="Is Open?"
        classes={classes}
      />
    </form>
  );
}

function mapStateToProps(state, ownProps) {
  console.log("ownProps", ownProps);
  const {initValues} = ownProps;
  return {
    initialValues: {
        ...initValues
    }
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: "locationForm", // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
  })(FormComponent)
);
