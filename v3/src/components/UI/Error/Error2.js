import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import { Typography, Paper, Card } from "@material-ui/core";

class MyError extends Component {
  render() {
    return (
      <Aux>
        {this.props.str == true ? (
          ""
        ) : (
          <Typography
            variant="p"
            align="center"
            style={{ paddingBottom: "20px", color: "red" }}
          >
            Invalid Username or Password
          </Typography>
        )}
      </Aux>
    );
  }
}

export default MyError;
