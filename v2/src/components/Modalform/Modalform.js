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
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.tablesData.open}
        onClose={this.props.handleOnClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                style={{ paddingBottom: "20px" }}
              >
                Select Dates
              </Typography>
              <Divider variant="middle" />

              <form onSubmit={this.props.booking}>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="email">User</InputLabel>
                  <Input
                    type="text"
                    id="user"
                    name="user"
                    autoFocus
                    value={this.props.userData}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="email">Model</InputLabel>
                  <Input
                    type="text"
                    id="Model"
                    name="Model"
                    autoFocus
                    value={this.props.tablesData.currentSelected}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Start Date</InputLabel>
                  <br />
                  <br />
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">End Date</InputLabel>
                  <br />
                  <br />
                  <Input name="endDate" type="date" id="endDate" />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                >
                  Reserve
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(Modalform);
