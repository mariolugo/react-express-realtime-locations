import React, { useState, useEffect } from "react";
// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { locationOperations } from "../../../state/ducks/locations";
import compose from "recompose/compose";

import {
  newLocations,
  editedLocation,
  deletedLocation
} from "../../../sockets";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Components
import {
  DialogComponent,
  FormComponent,
  TableComponent
} from "../../../components";

// Material components
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

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

  const { locations, isFetching, updated } = props.locations;
  const [loaded, setLoaded] = useState(false);
  const [locationsArray, setLocationsArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState({
    type: "create",
    open: false
  });

  const [values, setValues] = useState({
    name: "My location name",
    description: "My location description",
    longitude: -101.421675123715,
    latitude: 22.3157619728408,
    status: false
  });

  let initialValues = {
    name: "My location name",
    description: "My location description",
    longitude: -101.421675123715,
    latitude: 22.3157619728408,
    status: false
  };

  useEffect(() => {
    function getLocations() {
      fetchLocations();
    }
    if (!isFetching && Array.isArray(locations) && locations.length > 0) {
      setLocationsArray(locations);
    }

    if (updated) {
      setOpen(true);
    }

    if (!loaded && !isFetching) {
      getLocations();
      setLoaded(true);
    }
  }, [locations, fetchLocations, initialValues]);

  async function updateStatus(location) {
    let data = {
      ...location
    };
    data.status = !data.status;
    await updateLocation(data);
    await editedLocation();
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleModalClose() {
    setOpenModal({
      open: false
    });
  }

  async function handleCreateLocation() {
    const location = locationForm.values;
    await handleModalClose();
    await createLocation(location);
    await newLocations();
  }

  async function handleDeleteLocation(id) {
    let location = id;
    await deleteLocation(location);
    await deletedLocation();
  }

  async function openDialog(type, location) {
    if (typeof location !== "undefined") {
      setValues({
        ...location
      });
    } else {
      setValues({
        ...initialValues
      });
    }

    setOpenModal({
      open: true,
      type: type
    });
  }

  async function handleEditLocation() {
    const location = locationForm.values;
    await handleModalClose();
    await updateLocation(location);
    await newLocations();
  }

  return (
    <div className={classes.root}>
      {!loaded && <CircularProgress className={classes.progress} />}
      {loaded && (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Button
              onClick={() => openDialog("create")}
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
                <TableComponent
                  updateStatus={updateStatus}
                  classes={classes}
                  openDialog={openDialog}
                  handleDeleteLocation={handleDeleteLocation}
                  locationsArray={locationsArray}
                  calendarStrings={calendarStrings}
                />
              </div>
            </Paper>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={handleClose}
              message={<span>Updated location</span>}
            />
            <DialogComponent
              openModal={openModal.open}
              handleModalClose={handleModalClose}
              invalid={invalid}
              handleCreateLocation={handleCreateLocation}
              type={openModal.type}
              handleEditLocation={handleEditLocation}
            >
              <FormComponent classes={classes} initValues={values} />
            </DialogComponent>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

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

Locations.propTypes = {
  classes: PropTypes.object,
  fetchLocations: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  form: PropTypes.object
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Locations);
