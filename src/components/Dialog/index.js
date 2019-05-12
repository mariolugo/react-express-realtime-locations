import React from "react";

// Externals
import PropTypes from "prop-types";

// Material components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function DialogComponent(props) {
  const {
    children,
    openModal,
    handleModalClose,
    invalid,
    handleCreateLocation,
    type = "create",
    handleEditLocation
  } = props;
  return (
    <Dialog
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="alert-dialog-title">
        {type === "create" ? "Create Dialog" : "Update dialog"}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={
            type === "create" ? handleCreateLocation : handleEditLocation
          }
          disabled={invalid}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogComponent.propTypes = {
  children: PropTypes.node,
  openModal: PropTypes.bool,
  handleModalClose: PropTypes.func,
  invalid: PropTypes.bool,
  handleCreateLocation: PropTypes.func,
  type: PropTypes.oneOf(["create", "update"]),
  handleEditLocation: PropTypes.func
};

export default DialogComponent;
