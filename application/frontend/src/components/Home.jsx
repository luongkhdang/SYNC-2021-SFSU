import React, { Component, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import { Link, useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import "../css/Home.css";
import Create from "./Create";
import Footer from "./Footer";
import { serverPath } from '../path.js'

const Home = (props) => {
  {
    /* For updating the no of users */
  }
  
  const updateCurrentUser = (updateUserInfo) => {
    const stringUpdateUserInfo = JSON.stringify(updateUserInfo);
    localStorage.setItem("currentUser", stringUpdateUserInfo);
  };

  {
    /* For retrieving details of the current user from the local storage */
  }
  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);

    return retrieveUserInfo;
  };

  const [userInfo, setUserInfo] = useState(retrieveCurrentUser);

  {
    /* For viewing all the rooms */
  }

  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    if (userInfo != null) {
      if (userInfo.administratorStatus == 0) {
        Axios.get(serverPath.local + '/api/room_type/')
          .then((res) => {
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      } else {
        Axios.get(serverPath.local + '/api/adds/')
          .then((res) => {
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      }
    }
  }, []);
  {
    /* For joining rooms through join links*/
  }

  const joinRoom = (getFromid) => {

    const resultRoomId = getFromid;
    props.history.push("/Room/" + resultRoomId + "/");
  };

  const [createStatus, setCreateStatus] = useState(false);

  const toggleCreate = () => {
    setCreateStatus(!createStatus);
  };

  if (userInfo == null || !userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="main home-main">
        <div className="home-top-text-block">
          Search for a room to join, or create your own room!
        </div>
        <div className="button-column">
          <Link
            to="/Join"
            class="btn btn-dark sync-button-color home-button-design"
            style={{ marginBottom: "30px" }}
          >
            Join a Room
          </Link>
          <button
            class="btn btn-dark sync-button-color home-button-design"
            style={{ marginBottom: "30px" }}
            onClick={() => toggleCreate()}
          >
            Create a Room
          </button>
        </div>
        <div style={{ width: "500px" }}>{createStatus && <Create />}</div>

        <div className="spacer"></div>

        <div>
          <div class="main">
            <div
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className="home-top-text-block"
            >
              Recommended Rooms
            </div>
          </div>
          <Row gutter={[40, 16]}>
            {viewData?.map((d, index) => (
              <Col className="gutter-row" span={6}>
                <Card
                  className="join_cards"
                  hoverable
                  bordered
                  style={{ width: "80%", marginLeft: "30px" }}
                  cover={<img alt="example" src={d.roomImageUrl} />}
                >
                  <Row>
                    <Col xs={24} className="join_text">
                      Room Name:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.room_name}
                      </Typography.Text>
                    </Col>

                    <Col xs={24} className="join_text">
                      Genre:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.genre}
                      </Typography.Text>
                    </Col>
                    <Col xs={24} className="join_text">
                      Link to join:
                      <Button
                        type="link"
                        onClick={() => joinRoom(d.room_id)}
                        style={{ float: "right" }}
                      >
                        Click here
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

      </div>
    </div>
  );
};

export default Home;
