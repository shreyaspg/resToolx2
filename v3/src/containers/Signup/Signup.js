import React, { Component } from "react";
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
  InputLabel
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Aux from "../../hoc/Auxiliary";
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("this.state", this.state);
  }
  handleLogin(event) {
    event.preventDefault();
    // https://stackoverflow.com/questions/43085762/how-to-pass-form-values-as-formdata-in-reactjs-on-submit-function
    console.log("event", this.state);
    axios
      .post("/user/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          console.log("successful signup");
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
          console.log("[signup complete ]", this.state);
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    let styles = {
      paper: { paddingTop: "50px" },
      brand: { padding: "10px 10px 10px 10px", color: "#00b388" },
      body: { paddingTop: "10px" }
    };
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Aux>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={6} style={styles.body}>
              <Paper
                elevation={2}
                style={{ maxWidth: "400px", margin: "0px auto" }}
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      style={{ height: "10px", paddingTop: "50%" }}
                      image="http://analyticsindiamag.com/wp-content/uploads/2017/10/large.jpeg"
                      title="HPE"
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ paddingBottom: "20px" }}
                    >
                      Sign Up
                    </Typography>
                    <Divider variant="middle" />

                    <form onSubmit={this.handleLogin}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                          id="username"
                          name="username"
                          autoComplete="email"
                          value={this.state.username}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </FormControl>
                      {/* <FormControlLabel
            control={
              <Checkbox value="remember" color="secondary" />
            }
            label="Remember me"
          /> */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                      >
                        Sign Up
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
          ; )
        </Aux>
      );
    }
  }
}

export default Signup;
