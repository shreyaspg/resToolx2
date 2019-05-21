import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import axios from "axios";
import Aux from "../../hoc/Auxiliary";
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
import Axios from "axios";

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
  state = { info: [] };
  constructor(props) {
    super(props);
    this.setState({ info: this.props.tableContents });
  }
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
          <Divider variant="middle" />
          {this.props.tablesData === true
            ? console.log(
                "this.props.tableContents[this.props.index]",
                this.props.tableContents[this.props.index].bookings
              )
            : console.log("nothing")}
          {this.props.tablesData === true ? (
            <Aux>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#425563" }}>
                    <TableCell>From</TableCell>
                    <TableCell> To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.tableContents[this.props.index].bookings.map(
                    item => {
                      return (
                        <Aux>
                          <TableRow key={item._id}>
                            <TableCell>
                              <Typography>{item.fromDate}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{item.toDate}</Typography>
                            </TableCell>
                          </TableRow>
                        </Aux>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </Aux>
          ) : (
            console.log("")
          )}
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(Modalform);
