import React from "react";

// Externals
import PropTypes from "prop-types";
import Moment from "react-moment";

// Material components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";

function TableComponent(props) {
  const {
    classes,
    updateStatus,
    openDialog,
    handleDeleteLocation,
    locationsArray,
    calendarStrings
  } = props;

  return (
    <Table className={classes.table} aria-labelledby="tableTitle">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>ID</TableCell>
          <TableCell className={classes.tableCell}>Name</TableCell>
          <TableCell className={classes.tableCell}>Description</TableCell>
          <TableCell className={classes.tableCell}>Coordinates</TableCell>
          <TableCell className={classes.tableCell}>Open</TableCell>
          <TableCell className={classes.tableCell}>Created At</TableCell>
          <TableCell className={classes.tableCell}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeof locationsArray !== "undefined" &&
          Array.isArray(locationsArray) &&
          locationsArray.map((location, i) => (
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>{location.id}</TableCell>
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
                <Moment calendar={calendarStrings}>{location.createdAt}</Moment>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <div>
                  <IconButton
                    aria-label="Delete"
                    className={classes.margin}
                    onClick={() => openDialog("update", location)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    className={classes.margin}
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

TableComponent.propTypes = {
  classes: PropTypes.object,
  updateStatus: PropTypes.func,
  openDialog: PropTypes.func,
  handleDeleteLocation: PropTypes.func,
  locationsArray: PropTypes.array,
  calendarStrings: PropTypes.object
};

export default TableComponent;
