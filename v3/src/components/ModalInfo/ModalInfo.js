import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import {
  Grid,
  Paper,
  Card,
  CardActionArea,
  Divider,
  FormControl,
  Input,
  CardMedia,
  CardContent,
  Typography,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class Modalform extends Component {
  state = {};
  render() {
    console.log("info ", this.props);
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.tablesData}
        onClose={this.props.handleOnClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingBottom: "20px" }}
          >
            <Typography variant="h4">Name: {this.props.info.Name}</Typography>
            <Typography variant="h4">Model:{this.props.info.Model}</Typography>
            <Typography variant="h4">Type: {this.props.info.Type}</Typography>
          </Typography>
          <Divider variant="middle" />
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(Modalform);
