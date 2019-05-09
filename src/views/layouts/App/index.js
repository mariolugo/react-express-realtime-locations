import React, { useEffect, useState } from "react";

// Externals
import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Material helpers
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

// Material components
import Drawer from "@material-ui/core/Drawer";

// Custom components
import { TopbarComponent, SidebarComponent } from "../../../components";

// Component styles
import styles from "./styles";

function App({ children, classes, history, width, location }) {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (location.pathname === "/locations") {
      setTitle("Locations page");
    } else {
      setTitle("Map page");
    }
    return () => {};
  }, [location]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  const isMobile = ["xs", "sm", "md"].includes(width);
  const shiftTopbar = isOpen && !isMobile;
  const shiftContent = isOpen && !isMobile;

  return (
    <div>
      <TopbarComponent
        className={classNames(classes.topbar, {
          [classes.topbarShift]: shiftTopbar
        })}
        isSidebarOpen={isOpen}
        history={history}
        title={title}
        onToggleSidebar={handleToggleOpen}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={isMobile ? "temporary" : "persistent"}
      >
        <SidebarComponent className={classes.sidebar} location={location} />
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: shiftContent
        })}
      >
        {children}
      </main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth(),
  withRouter
)(App);
