import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import "../css/Chat.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Button, Input } from "antd";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    boxShadow: "none",
  },
});

class Chatroom extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: true,
    messages: [],
    value: "",
    name: this.props.displayName,
    room: this.props.roomName,
  };

  client = new W3CWebSocket(
    "ws://18.219.141.181:8000/ws/chat/" + this.props.roomId + "/"
  ); /* put id here */

  onButtonClicked = (e) => {
    var sendStr = JSON.stringify({
      type: "message",
      message: this.state.value,
      name: this.props.displayName,
      profileUrl: this.props.profilePictureUrl,
    });
    this.client.send(sendStr);
    this.state.value = "";
    e.preventDefault();
  };

  componentDidMount() {
    this.client.onopen = () => {
      /* console.log("WebSocket Client Connected"); */
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      /* console.log("got reply! ", dataFromServer.type); */
      if (dataFromServer) {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.message,
              name: dataFromServer.name,
              profileUrl: dataFromServer.profileUrl,
            },
          ],
        }));
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Container style={{height: "calc(100% - 108px)", padding: "15px"}}>
        {this.state.isLoggedIn ? (
          <div className="realtime-containter">
            <div className="chat-top-text">The {this.state.room.length > 10
                ? this.state.room.substring(0, 10) + "..."
                : this.state.room} Chat Room</div>
            <Paper className="realtime-chat-messages">
              {this.state.messages.reverse().map((message) => (
                <>
                  <div>
                    <div className="realtime-card-flex">
                      <Avatar
                        className={classes.avatar}
                        className="realtime-avatar"
                        src={message.profileUrl}
                      >
                        {message.name.charAt(0)}
                      </Avatar>
                      <div>
                        <div className="realtime-card-title">
                          {message.name}
                        </div>
                        <div className="realtime-card-subheader">
                          {message.msg}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </Paper>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.onButtonClicked}
            >
              <Input
                placeholder="Send a Message"
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                }}
                className="chat-input"
                autoFocus
                autoComplete="off"
                allowClear="true"
                value={this.state.value}
              />
              {/* <TextField
                id="outlined-helperText"
                label="Make a comment"
                defaultValue="Default Value"
                variant="outlined"
                value={this.state.value}
                fullWidth
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                }}
                style={{
                  backgroundColor: "var(--color1)",
                  borderRadius: "5px",
                  color: "var(--color4)",
                }}
              /> */}
              <Button
                type="primary"
                htmlType="submit"
                className="sync-button-color"
                style={{ marginTop: "10px" }}
              >
                Send Comment
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                ChattyRooms
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={(value) => this.setState({ isLoggedIn: true })}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Chatroom Name"
                  name="Chatroom Name"
                  autoFocus
                  value={this.state.room}
                  onChange={(e) => {
                    this.setState({ room: e.target.value });
                    this.value = this.state.room;
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Username"
                  label="Username"
                  type="Username"
                  id="Username"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                    this.value = this.state.name;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Start Chatting
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        )}
      </Container>
    );
  }
}
export default withStyles(useStyles)(Chatroom);
