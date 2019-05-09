import React from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Material components
import Paper from "@material-ui/core/Paper";

// Cesium
import { Viewer, Entity, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const position2 = Cartesian3.fromDegrees(-75.0707383, 41.7117244, 100);
const pointGraphics = { pixelSize: 10 };

function Map(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Viewer>
          <Entity position={position} point={pointGraphics}>
            <EntityDescription>
              <h1>Hello!</h1>
              <p>This is description. It can be described with JSX!</p>
            </EntityDescription>
          </Entity>
          <Entity position={position2} point={pointGraphics}>
            <EntityDescription>
              <h1>Hello!</h1>
              <p>This is description. It can be described with JSX!</p>
            </EntityDescription>
          </Entity>
        </Viewer>
      </Paper>
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

export default withStyles(styles)(Map);
