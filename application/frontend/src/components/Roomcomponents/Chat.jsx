import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List } from "antd";
import Axios from "axios";
import "../../css/Chat.css";
import Chatcard from "./Chatcard.jsx";
import renderEmpty from "antd/lib/config-provider/renderEmpty";

const useForceUpdate = () => {
  const [_, setState] = useState(false);
  return () => setState((val) => !val);
};

const Chat = (props) => {
  const [comments, setComments] = useState([{ userName: "", comment: "" }]);
  const [currentComment, setCurrentComment] = useState();
  const [update, setUpdate] = useState();
  const [intervaled, setIntervaled] = useState(false);
  const forceUpdate = useForceUpdate();

  const currentUser = "Username";

  const userList = [
    "Rebecca",
    "Luong",
    "Vishaka",
    "Ashwini",
    "Hirva",
    "Malcolm",
    "Bryan",
    "Frank",
    "Bill",
    "Ted",
    "Susan",
    "Nathaniel",
    "Jane",
    "Maria",
    "Venessa",
    "Patrick",
    "Howard",
    "Claudia",
    "George",
    "Xena",
  ];

  const commentList = [
    "I'm vibing to this song",
    "Anyone know the name of this tune?",
    "Let's not choose this song again",
    "I need something more upbeat",
    "Wow, this track is amazing",
    "This is the best room I've been in",
    "lol",
    "bring back that last song",
    "what do you mean by that?",
    "ok everybody, lets all calm down",
    "everything is allll right",
    "pog",
    "move over Metallica",
    "I need to watch more anime",
    "how much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "I hope I passed my last exam",
    "Man, this project is a lot of work",
    "These guys should make a new album",
    "If it wasn't for the beetles, music wouldn't even exist anymore!",
    "Now I'm confused.",
  ];

  const renderChat = () => {
    if (comments) {
      return comments.map((comment) => {
        if (comment.comment.length > 0) {
          return (
            <div className="chat-card">
              <strong>{comment.userName}</strong>: {comment.comment}
            </div>
          );
        }
      });
    }
  };

  const handleSubmit = () => {
    if (currentComment) {
      let newComment = currentComment.target.value;
      addToChatLog(currentUser, newComment);
      document.getElementById("commentform").reset();
      setCurrentComment("");
    }
  };

  const addToChatLog = (user, comment) => {
    if (!comments) {
      setComments([{ userName: user, comment: comment }]);
    } else {
      comments.unshift({
        userName: user,
        comment: comment,
      });
    }
    if (comments.length > 100) {
      comments.splice(100);
    }
  };

  const randomChat = () => {
    var randomUser = userList[Math.floor(Math.random() * userList.length)];
    var randomComment =
      commentList[Math.floor(Math.random() * commentList.length)];
    addToChatLog(randomUser, randomComment);
    forceUpdate();
  };

  var interval = () => {
    var randomInterval = Math.floor(Math.random() * 5000 + 2000);
    setInterval(randomChat, randomInterval);
  };

  if (!intervaled) {
    interval();
    setIntervaled(true);
  }

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 0,
    },
  };

  const otherItemLayout = {
    wrapperCol: {
      span: 0,
      offset: 5,
    },
  };

  return (
    <div className="chat-main">
      <div className="chat-box-and-form">
        <div className="chat-top-text">The {props.roomName} Chat Room</div>
        <div className="chat-box-flex" id="chat-box-flex">
          {renderChat()}
          <div className="anchor"></div>
        </div>
        <Form
          className="text-color chat-form-flex"
          id="commentform"
          /*  style={{ marginTop: "150px", marginLeft: "400px" }} */
        >
          <Form.Item
            name="roomname"
            //rules={[{ required: true, message: "Please input your roomname!" }]}
          >
            <Input
              placeholder="Send a Message"
              onChange={(e) => {
                setCurrentComment(e);
              }}
              className="chat-input"
              autoFocus
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item id="commentSubmission" style={{ marginBottom: "0px" }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit()}
              className="sync-button-color"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
