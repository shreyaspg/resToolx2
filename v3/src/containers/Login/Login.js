import React, { Component } from "react";
import axios from "axios";
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
import Aux from "../../hoc/Auxiliary";
import { Redirect } from "react-router-dom";
import MyError from "../../components/UI/Error/Error";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      str: "null",
      redirectTo: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin(event) {
    event.preventDefault();
    // https://stackoverflow.com/questions/43085762/how-to-pass-form-values-as-formdata-in-reactjs-on-submit-function
    // const data = new FormData(event.target);
    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/home"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
        this.setState({ str: "fail" });
      });
  }
  componentDidMount() {
    console.log("logging out");
    console.log("this.props", this.props);
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updatedUser({
            loggedIn: false,
            username: null
          });
          this.setState({
            redirectTo: "/login"
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
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
                      Log In
                    </Typography>
                    <Divider variant="middle" />

                    <form onSubmit={this.handleLogin}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Username</InputLabel>
                        <Input
                          id="username"
                          name="username"
                          autoComplete="email"
                          autoFocus
                          value={this.state.username}
                          onChange={this.handleChange}
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
                      <MyError str={this.state.str} />

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
                        Log In
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

export default Login;
// import React, { Component } from "react";
// import { render } from "react-dom";
// import {
//   Box,
//   Button,
//   Grommet,
//   Text,
//   TextInput,
//   ResponsiveContext
// } from "grommet";
// class Login extends Component {
//   state = {};
//   render() {
//     return (
//       <Box flex overflow="auto" gap="medium" pad="medium">
//         <Box
//           flex={false}
//           overflow="auto"
//           round="large"
//           background={{ color: "dark-5", opacity: "weak" }}
//           direction="row"
//           align="center"
//           pad={{ horizontal: "medium", vertical: "small" }}
//           margin={{ horizontal: "medium", top: "medium" }}
//         >
//           <Box flex={false} direction="row-responsive" wrap>
//             <Box gap="large" flex="grow" margin="medium">
//               hello
//             </Box>
//             <Box gap="large" flex="grow" margin="medium">
//               world
//             </Box>
//             <Box flex="grow" margin="medium">
//               hardware
//             </Box>
//           </Box>
//           <TextInput plain placeholder="Search Cluster" type="search" />
//         </Box>
//       </Box>
//     );
//   }
// }

// export default Login;
