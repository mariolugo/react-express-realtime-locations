import React from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

function Locations(props) {
    const { classes } = props;
  return (
    <div className={classes.root}>
      <p>This is the locations page</p>
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
  }
});

Locations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Locations);
