import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Card,
  Typography,
  AutoComplete,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import Axios from "axios";
import { DownOutlined, SearchOutlined  } from "@ant-design/icons";
import "../css/Join.css";
import Footer from "./Footer";
import { serverPath } from '../path.js'

const Join = (props) => {
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

  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchBarText, setSearchBarText] = useState({
    textField: 'Search rooms by "name" or "genre"',
    dropDown: "All",
  });

  {
    /* For calling different functions to search based on the menu item selected.  */
  }
 
  const onClickfunction = ({ key }) => {
    if (`${key}` == 1) {
      searchAll();
      setSearchBarText({
        textField: "Search rooms by 'name' or 'genre'",
        dropDown: "All",

      });
    }  else if (`${key}` == 2) {
      searchByName();
      setSearchBarText({
        textField: "e.g. Tom's room",
        dropDown: "Room name",
      });
    }else if (`${key}` == 3) {
      searchByGenre();
      setSearchBarText({
        textField: "e.g. Electronic",
        dropDown: "Genre",
      });
    }
  };
  {
    /* Menu options for the dropdown */
  }
  const menu = (
    <Menu onClick={onClickfunction}>
      <Menu.Item key="1">All</Menu.Item>
      <Menu.Item key="2">Room name</Menu.Item>
      <Menu.Item key="3">Genre</Menu.Item>
    </Menu>
  );

  {
    /* For viewing all the rooms */
  }
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

  useEffect(() => {
    if (searchValue === "") {
      setSearchedData([]);
    }
  }, [searchValue]);

  {
    /* For searching all the rooms with roomname or genre*/
  }
  const searchAll = () => {
    if (userInfo != null) {
      if (userInfo.administratorStatus == 0) {
        Axios.get(serverPath.local + '/api/room_type/')
          .then((res) => {
            let tempOptions = [];
            res.data.forEach((d) => {
              tempOptions.push({ value: d.room_name + '-' + d.genre});
            });
            setOptions(tempOptions);
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
    
  };
  {
    /* For searching the rooms based on roomname only */
  }
  const searchByName = () => {
    if (userInfo != null) {
      if (userInfo.administratorStatus == 0) {
        Axios.get(serverPath.local + '/api/room_type/')
          .then((res) => {
            let tempOptions = [];
            res.data.forEach((d) => {
              tempOptions.push({ value: d.room_name });
            });
            setOptions(tempOptions);
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      } else {
        Axios.get(serverPath.local + '/api/adds/')
          .then((res) => {
            let tempOptions = [];
              res.data.forEach((d) => {
                tempOptions.push({ value: d.room_name });
              });
              setOptions(tempOptions);
              setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      }
    }
    
  };
  {
    /* For searching the rooms based on roomname only */
  }
  const searchByGenre = () => {
    if (userInfo != null) {
      if (userInfo.administratorStatus == 0) {
        Axios.get(serverPath.local + '/api/room_type/')
          .then((res) => {
            let tempOptions = [];
            res.data.forEach((d) => {
              tempOptions.push({ value: d.genre });
            });
            setOptions(tempOptions);
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      } else {
        Axios.get(serverPath.local + '/api/adds/')
          .then((res) => {
            let tempOptions = [];
              res.data.forEach((d) => {
                tempOptions.push({ value: d.genre });
              });
              setOptions(tempOptions);
              setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
      }
    }
   
  };

  {
    /* For joining rooms through the join links*/
  }

  const joinRoom = (getFromid) => {
    const resultRoomId = getFromid;
    props.history.push("/Room/"+ resultRoomId + "/")
  };
  const searchRoom = () => {
    if (searchValue === "") return;
    let result = viewData.filter((d) =>
      d.room_name.toLowerCase().includes(searchValue.toLowerCase())||
      d.genre.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedData(result);
  };

  if (userInfo == null || !userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div>
        <Row>
          <Col xs={24}>
            <div class="main">
              <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
                {" "}
                Search for rooms here
              </h2>
            </div>
          </Col>
        </Row>
        {options && (
          <div className="search_bar">
            <Dropdown overlay={menu}>
              <Button
                type="primary"
                className="ant-dropdown-link dropdown_button"
                onClick={(e) => e.preventDefault()}
              >
                {searchBarText.dropDown} <DownOutlined />
              </Button>
            </Dropdown>
            <AutoComplete
              style={{ width: "20%" }}
              onSearch={(value) => {
                setSearchValue(value);
                let result = viewData.filter(
                  (d) =>
                    d.room_name.toLowerCase().includes(value.toLowerCase()) ||
                    d.genre.toLowerCase().includes(value.toLowerCase())
                );
                setSearchedData(result);
              }}
              onSelect={(value) => {
                setSearchValue(value);
                let result = viewData.filter(
                  (d) =>
                    d.room_name.toLowerCase().includes(value.toLowerCase()) ||
                    d.genre.toLowerCase().includes(value.toLowerCase())
                );

                setSearchedData(result);
              }}
              notFoundContent="Sorry, the room with this name or genre was not found..." 
              options={options}
              placeholder={searchBarText.textField}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            ></AutoComplete>
             <Button icon={<SearchOutlined />} className="dropdown_button" type="primary" onClick={()=>searchRoom()}></Button>
          </div>
        )}

        {searchedData && searchedData.length > 0 && (
          <div>
            <Row>
              <Col xs={24}>
                <div class="main">
                  <h4 style={{ marginTop: "30px", marginBottom: "30px" }}>
                    {'Searched Rooms by  "' + searchValue + '"'}
                  </h4>
                </div>
              </Col>

              <Col xs={24}>
                <Row gutter={[40, 16]}>
                  {searchedData &&
                    searchedData.map((d, index) => (
                      <Col className="gutter-row" span={6} key={index}>
                        <Card
                          hoverable
                          bordered
                          style={{ width: "80%", marginLeft: "30px" }}
                          cover={<img alt="example" src={d.roomImageUrl} />}
                          className="join_cards"
                        >
                          <Row>
                            <Col xs={24} className="join_text">
                              Room Name:
                              <Typography.Text
                                className="join_text"
                                style={{ float: "right" }}
                                level={5}
                              >
                                {d.room_name}
                              </Typography.Text>
                            </Col>
                            <Col xs={24} className="join_text">
                              Genre:{" "}
                              <Typography.Text
                                className="join_text"
                                style={{ float: "right" }}
                              >
                                {d.genre}
                              </Typography.Text>
                            </Col>
                            <Col xs={24} className="join_text">
                              Link to join :
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
              </Col>
            </Row>
            <Divider />
          </div>
        )}
        <Row>
          <Col xs={24}>
            <div class="main">
              <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
                {searchedData && searchedData.length > 0
                  ? "All Rooms"
                  : "Recommended Rooms"}
              </h2>
            </div>
          </Col>

          <Col xs={24}>
            <Row gutter={[40, 16]}>
              {viewData &&
                viewData.map((d, index) => (
                  <Col className="gutter-row" span={6} key={index}>
                    <Card
                      hoverable
                      bordered
                      style={{ width: "80%", marginLeft: "30px" }}
                      cover={<img alt="example" src={d.roomImageUrl} />}
                      className="join_cards"
                    >
                      <Row>
                        <Col xs={24} className="join_text">
                          Room Name:
                          <Typography.Text
                            className="join_text"
                            style={{ float: "right" }}
                            level={5}
                          >
                            {d.room_name}
                          </Typography.Text>
                        </Col>
                        <Col xs={24} className="join_text">
                          Genre:{" "}
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
          </Col>
        </Row>
      </div>
      <div>
      </div>
    </Fragment>
  );
};

export default Join;
