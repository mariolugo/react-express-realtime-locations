import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { locationOperations } from "../../../state/ducks/locations";
import compose from "recompose/compose";
import { validate } from "../../../common/validators";
import Moment from "react-moment";
import { newLocations, editedLocation, deletedLocation } from "../../../sockets";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Material components
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function Locations(props) {
  const {
    classes,
    fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    invalid,
    form
  } = props;

  const { locationForm } = form;

  //moment configuration
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L"
  };


  console.log("props", props);

  const { locations, isFetching } = props.locations;
  const [loaded, setLoaded] = useState(false);
  const [locationsArray, setLocationsArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  if (!loaded) {
    fetchLocations();
    setLoaded(true);
  }

  useEffect(() => {
    if (Array.isArray(locations) && locations.length > 0) {
      setLocationsArray(locations);
    }
  }, [locations]);

  async function updateStatus(location) {
    let data = {
      ...location
    };
    data.status = !data.status;
    await updateLocation(data);
    await setOpen(true);
    await editedLocation();
  }

  function handleClose() {
    setOpen(false);
  }

  function openCreateModal() {
    setOpenModal(true);
  }

  async function handleModalClose() {
    setOpenModal(false);
  }

  async function handleCreateLocation() {
    console.log("values", locationForm.values);
    const location = locationForm.values;
    await handleModalClose();
    await createLocation(location);
    await newLocations();
  }

  async function handleDeleteLocation(id){
    let location = id;
    await deleteLocation(location);
    await deletedLocation();
  }

  return (
    <div className={classes.root}>
      {isFetching && <CircularProgress className={classes.progress} />}
      {!isFetching && (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Button
              onClick={openCreateModal}
              variant="contained"
              color="primary"
            >
              Create location
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.title}>
                  <Typography variant="h4" id="tableTitle">
                    Locations
                  </Typography>
                </div>
              </Toolbar>
              <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>ID</TableCell>
                      <TableCell className={classes.tableCell}>Name</TableCell>
                      <TableCell className={classes.tableCell}>
                        Description
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Coordinates
                      </TableCell>
                      <TableCell className={classes.tableCell}>Open</TableCell>
                      <TableCell className={classes.tableCell}>
                        Created At
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {typeof locationsArray !== "undefined" &&
                      Array.isArray(locationsArray) &&
                      locationsArray.map((location, i) => (
                        <TableRow key={i}>
                          <TableCell className={classes.tableCell}>
                            {location.id}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {location.name}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {location.description}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            ({location.latitude}, {location.longitude})
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Switch
                              checked={location.status}
                              onChange={() => updateStatus(location)}
                              value="location.status"
                            />
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Moment calendar={calendarStrings} >
                              {location.createdAt}
                            </Moment>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <div>
                              <IconButton
                                aria-label="Delete"
                                className={classes.margin}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                aria-label="Delete"
                                className={classes.margin}
                                onClick={()=>handleDeleteLocation(location.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={handleClose}
              message={<span>Updated location</span>}
            />

            <Dialog
              open={openModal}
              onClose={handleModalClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
              maxWidth={"sm"}
            >
              <DialogTitle id="alert-dialog-title">
                {"Create location"}
              </DialogTitle>
              <DialogContent>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLocation}
                  disabled={invalid}
                  color="primary"
                  autoFocus
                >
                  Create Location
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

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

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  item: {
    height: "100%"
  },
  progress: {
    margin: "auuto"
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  toolbar: {
    paddingRight: theme.spacing.unit
  },
  title: {
    flex: "0 0 auto"
  },
  tableCell: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)"
  }
});

Locations.propTypes = {
  classes: PropTypes.object.isRequired
};

//get the pokemon state and map it to props
const mapStateToProps = state => {
  return {
    locations: state.locations.locations,
    form: state.form
  };
};

//dispatch actions
const mapDispatchToProps = {
  fetchLocations: locationOperations.fetchLocations,
  createLocation: locationOperations.createLocations,
  updateLocation: locationOperations.updateLocations,
  deleteLocation: locationOperations.deleteLocations
};

export default compose(
  reduxForm({
    form: "locationForm", // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    initialValues: {
      name: "My location name",
      description: "My location description",
      latitude: 29.0968238,
      longitude: 110.94602069999999,
      status: false
    }
  }),
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Locations);
