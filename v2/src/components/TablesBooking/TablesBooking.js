import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import {
  Grid,
  Paper,
  Card,
  CardActionArea,
  Divider,
  FormControl,
  Input,
  Button,
  CardMedia,
  CardContent,
  Typography,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  withStyles
} from "@material-ui/core";

import Modalform from "../Modalform/Modalform";
import ModalInfo from "../ModalInfo/ModalInfo";
import ModalBooking from "../ModalBooking/ModalBooking";
import MyError from "../../components/UI/Error/Error";

import axios from "axios";

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

class Tables extends Component {
  state = {
    tableElements: [],
    open: false,
    currentSelected: "",
    infomodal: false,
    bookingmodal: false,
    decider: false,
    bookingElements: [],
    index: 0
  };

  getTables() {
    axios
      .get("/storage")
      .then(response => {
        let result = response.data;
        console.log("result table", result);
        this.setState({ tableElements: result });
      })
      .catch(error => {
        console.log(" error: ");
        console.log(error);
      });
  }

  componentDidMount() {
    this.getTables();
  }

  render() {
    let decider = "true";
    const { classes } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#425563" }}>
              <TableCell>From</TableCell>
              <TableCell> To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tableElements.map(item => {
              return (
                <Aux>
                  <TableRow key={item._id}>
                    <TableCell>
                      <Typography>{item.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.Type}</Typography>
                    </TableCell>
                  </TableRow>
                </Aux>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Tables);
