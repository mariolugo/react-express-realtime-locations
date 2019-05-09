import React from "react";
import { Link, NavLink } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Material components
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MapIcon from "@material-ui/icons/Map";
import PlaceIcon from "@material-ui/icons/Place";

// Component styles
import styles from "./styles";

function Sidebar({ className, classes, location }) {
  const rootClassName = classNames(classes.root, className);
  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/">
          <Typography variant="h3">RT Map Locations</Typography>
        </Link>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/">
          <Typography className={classes.nameText} variant="h6">
            Mario Lugo
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            mariolugo23@gmail.com
          </Typography>
        </Link>
      </div>
      <Divider className={classes.profileDivider} />
      <List component="div" disablePadding>
        <ListItem
          activeClassName={location.pathname === '/' ?classes.activeListItem:null}
          className={classes.listItem}
          component={NavLink}
          to="/"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <MapIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Map"
          />
        </ListItem>
        <ListItem
          activeClassName={location.pathname === '/locations' ?classes.activeListItem:null}
          className={classes.listItem}
          component={NavLink}
          to="/locations"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Locations"
          />
        </ListItem>
      </List>
    </nav>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
