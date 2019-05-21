import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import { Redirect } from "react-router-dom";
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
import Visibilty from "@material-ui/icons/Visibility";
import Info from "@material-ui/icons/Info";
import Timeline from "@material-ui/icons/Timeline";

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

  handleBooking = event => {
    console.log("booked");
    event.preventDefault();
    let username = event.target.user.value;
    let model = event.target.Model.value;
    let startDate = event.target.startDate.value;
    let endDate = event.target.endDate.value;
    let formData = {};
    formData.username = username;
    formData.model = model;
    formData.startDate = startDate;
    formData.endDate = endDate;
    console.log("data", formData);
    axios
      .post("/book", formData)
      .then(response => {
        let result = response.data;
        console.log("result", result);
      })
      .catch(error => {
        console.log(" error: ");
        console.log(error);
      });
    this.setState({ open: false });
    this.getTables();
  };
  handleLogin() {
    console.log("Reserved");
  }
  handleOpen = Model => {
    this.setState({ open: true });
    this.setState({ currentSelected: Model });
  };
  handleOpenModal = Model => {
    this.setState({ currentSelected: Model });
    this.setState({ infomodal: true });
  };
  handleBookingModal = (Model, getBookings) => {
    this.setState({ currentSelected: Model });
    this.getBookings(this.state.currentSelected);
    this.setState({ bookingmodal: true });
  };
  setRedirect = () => {
    return <Redirect to="/home" />;
  };
  renderBooking = (Model, index) => {
    this.setState({ currentSelected: Model });
    console.log("index", index);
    this.setState({ index: index });
    this.setState({ bookingmodal: true });
  };
  buttonClick(Model) {
    console.log(Model);
    this.handleOpen(Model);
  }
  buttonClickInfo(Item) {
    console.log(Item);
    this.handleOpenModal(Item);
  }

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ currentSelected: "" });
  };
  handleClose2 = () => {
    this.setState({ infomodal: false });
  };
  handleClose3 = () => {
    this.setState({ bookingmodal: false });
    this.setState({ currentSelected: "" });
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
  // getBookings(Model) {
  //   let dataObj = {};
  //   dataObj.model = Model;

  //   console.log("dataObj", dataObj);
  //   axios
  //     .post("/book/booking")
  //     .then(response => {
  //       let result = response.data;
  //       console.log("result", result);

  //       this.setState({ bookingElements: result });
  //       console.log("this.state.bookingElements", this.state.bookingElements);
  //     })
  //     .catch(error => {
  //       console.log(" error: ");
  //       console.log(error);
  //     });
  // }
  componentDidMount() {
    this.getTables();
  }

  render() {
    let decider = "true";
    const { classes } = this.props;
    return (
      <Paper>
        <Modalform
          booking={this.handleBooking}
          userData={this.props.userData}
          tablesData={this.state}
          handleOnClose={this.handleClose}
        />
        <ModalInfo
          userData={this.props.userData}
          tablesData={this.state.infomodal}
          handleOnClose={this.handleClose2}
          info={this.state.currentSelected}
          currentSelected={this.state.currentSelected}
        />
        <ModalBooking
          tablesData={this.state.bookingmodal}
          handleOnClose={this.handleClose3}
          index={this.state.index}
          tableContents={this.state.tableElements}
        />
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#425563" }}>
              <TableCell>NAME</TableCell>
              <TableCell> TYPE</TableCell>
              <TableCell> MODEL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell> ACTION</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tableElements.map((item, index) => {
              return (
                <Aux>
                  <TableRow key={item._id}>
                    <TableCell>
                      <Typography>{item.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.Type}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.Model}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {item.start ? "Busy" : "Available"}
                      </Typography>
                    </TableCell>
                    {(item.start ? "Busy" : "Available") === "Busy"
                      ? (decider = false)
                      : (decider = true)}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={decider}
                        onClick={() => {
                          this.buttonClick(item.Model);
                        }}
                      >
                        Reserve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        // onClick={() => {
                        //   this.renderBooking(item.Model, index);
                        // }}
                        onClick={this.setRedirect}

                        // href="/bookings"
                      >
                        <Visibilty />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => {
                          console.log("clicked");
                          this.buttonClickInfo(item);
                        }}
                      >
                        <Info />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => {
                          console.log("clicked");
                          this.buttonClickInfo(item);
                        }}
                      >
                        <Timeline />
                      </Button>
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
