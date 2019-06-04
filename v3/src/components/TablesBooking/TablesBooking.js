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
    tableElements: {},
    open: false,
    currentSelected: {},
    infomodal: false,
    bookingmodal: false,
    decider: false,
    bookingElements: [],
    index: 0
  };
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  getTables() {
    let dataObj = {};
    dataObj.model = this.props.model;
    console.log("dataObj", dataObj);
    axios
      .post("/book/bookingtable", dataObj)
      .then(response => {
        // let result = [];
        // result.push(response.data);
        let result = response.data;
        console.log("result book table", result);
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
              <TableCell>Booked By</TableCell>
              <TableCell>From</TableCell>
              <TableCell> To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(
              "this.state.tableElements",
              this.isEmpty(this.state.tableElements.bookings)
            )}

            {this.isEmpty(this.state.tableElements.bookings) === false
              ? this.state.tableElements.bookings.map(item => {
                  console.log("data", item);
                  return (
                    <Aux>
                      <TableRow key={item._id}>
                        <TableCell>
                          <Typography>{item.user.username}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.fromDate.substr(0, 10)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.toDate.substr(0, 10)}</Typography>
                        </TableCell>
                      </TableRow>
                    </Aux>
                  );
                  // });
                })
              : console.log("nothing")}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Tables);
