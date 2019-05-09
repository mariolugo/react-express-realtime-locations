import React, { useState, useEffect } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { locationOperations } from "../../../state/ducks/locations";
import compose from "recompose/compose";

// Material components
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
// Cesium
import { Viewer, Entity, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";

const pointGraphics = { pixelSize: 10 };

function Map(props) {
  const { classes, fetchLocations } = props;
  const { locations, isFetching } = props.locations;
  console.log("props", props);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  let entities = [];

  if (typeof locations !== "undefined" && locations.length > 0) {
    locations.forEach((location, index) => {
      // set longitude, location and constant height from location
      const position = Cartesian3.fromDegrees(
        location.longitude,
        location.latitude,
        100
      );
      entities.push(
        <Entity position={position} selected={location.status} point={pointGraphics} key={index}>
          <EntityDescription>
            <Typography variant="h3">{location.name}</Typography>
            <Typography variant="h4">{location.description}</Typography>
          </EntityDescription>
        </Entity>
      );
    });
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Viewer>{entities}</Viewer>
      </Paper>
      {isFetching && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          message={<span>LOADING LOCATIONS...</span>}
        />
      )}
    </div>
  );
}

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: "100%"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

Map.propTypes = {
  classes: PropTypes.object.isRequired
};

//get the pokemon state and map it to props
const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  };
};

//dispatch actions
const mapDispatchToProps = {
  fetchLocations: locationOperations.fetchLocations
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Map);
