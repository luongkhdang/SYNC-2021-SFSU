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
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "../css/Home.css";
import Create from "./Create";
import Footer from "./Footer";
import { serverPath } from '../path.js'

const DeleteRoom = (props) => {

    {
    /* For viewing all the rooms */
    }
    const [viewData, setViewData] = useState([]);
    const history = useHistory()
    const [roomType, setRoomType] = useState();

    useEffect(() => {
        Axios.get(serverPath.local + '/api/adds/')
        .then((res) => {
            setViewData(res.data);
        })
        .catch((er) => console.log(er));
    }, []);
    {
      /* For joining the room using join links */
    }
    const joinRoom = (roomid) => {
   
        const resultRoomId = roomid;
        props.history.push(
          "/Room/" +
            resultRoomId +
            "/" 
        );
      };
      {
        /* For deleting a room based on the id */
      }  
      const deleteRoom = (roomid) => {
        
        var data = {
          
          id: roomid,
        };
        console.log(data.id)
        Axios.delete(serverPath.local + '/api/adds/'+ data.id + "/")
        .then((res) => {
          Axios.get(serverPath.local + '/api/adds/')
          .then((res) => {
              setViewData(res.data);
          })
        .catch((er) => console.log(er));
           
        })
        .catch((er) => console.log(er));
        
       
      };
    
    return (
        <div>
            <div class="main">
            <div
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className="home-top-text-block"
            >
              All Rooms
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
                     Room Type:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      
                      >
                        {roomType}
                      </Typography.Text>
                    </Col>
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
                      No of members:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {Math.floor(Math.random()*50)}
                      </Typography.Text>
                    </Col>
                    <Col xs={24} className="join_text">
                      Link to join:
                      
                      <Button
                        type="link"
                        onClick={() => joinRoom(d.id)}
                        style={{ float: "right"}}
                        
                      >
                        Click here
                      </Button>
                      
                    </Col>
                    <Col xs={24} className="join_text">
                       <Button
                            type="link"
                            onClick={() => deleteRoom(d.room_id)}
                            style={{ float: "right"}}
                            
                        >
                            Destroy this room
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    );
}

export default DeleteRoom
