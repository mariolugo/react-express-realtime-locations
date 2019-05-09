import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core/styles";

// Material components
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/CloseOutlined";

// Component styles
import styles from "./styles";

function Topbar({
  isSidebarOpen,
  classes,
  className,
  onToggleSidebar,
  title
}) {
  const rootClassName = classNames(classes.root, className);
  return (
    <div className={rootClassName}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          variant="text"
          onClick={onToggleSidebar}
          className={classes.menuButton}
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
      </Toolbar>
    </div>
  );
}

Topbar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

export default withStyles(styles)(Topbar);
