import React, { Component, useState, setState, Link, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  message,
  Select,
  Radio,
  Col,
  Popup,
  Popover,
  Popconfirm,
  Card,
  Typography,
  Row,
} from "antd";
import Axios from "axios";
import "../css/banuser.css";
import { serverPath } from '../path.js'

const Ban_User = () => {
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
    {
    /* For banning a user based on the id */
    }
    const onClickFunks = () => {
      var data = {
        ban_comments : comment,
        ban_status : '1',
      }
      Axios.patch(serverPath.local + '/api/users/' + userId + "/", data)
        .then((res) => {
          console.log('banned')
        })
        .catch((er) => {
          {
          }
        });
    }
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showPopconfirm = () => {
        setVisible(true);
      };
    
      const handleOk = () => {
        setConfirmLoading(true);
        onClickFunks();
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };

      const [viewData, setViewData] = useState([]);
      const [userId, setUserId] = useState();
      const [comment, setComment] = useState();
  {
    /* For viewing all the users */
  }
  useEffect(() => {
    
        Axios.get(serverPath.local + '/api/users/')
          .then((res) => {
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
     
  }, []);
    return (
        <div className="createpage-flex text-color">
      <div className="createpage-top-text-block">Ban a User!</div>
        <div className="create-main">
            <Form 
                {...formItemLayout}
                className="text-color"
            >
                <Form.Item
                label="User Id"
                name="Userid"
                rules={[
                    {
                    required: true,
                    message: "Please input a user name.",
                    },
                ]}
                >
          <Input
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Comment"
          name="comment"
          rules={[
            {
              required: true,
              message: "Please add some comments on ban purpose.",
            },
          ]}
        > 
          <Input.TextArea
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item {...otherItemLayout} style={{ marginBottom: "0px" }}>
            <Popconfirm
            title="Are you sure you want to ban this user"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
             >
          <Button
            type="primary"
            htmlType="submit"
            onClick={showPopconfirm}
            className="sync-button-color"
          >
            Submit
          </Button>
          </Popconfirm>
        </Form.Item>
      </Form >
       
        </div>
        <div className="spacer"></div>

        <div>
          <div class="main">
            <div
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className="home-top-text-block"
            >
              All Users
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
                >
                  <Row>
                    <Col xs={24} className="join_text">
                      User Id:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.user_id}
                      </Typography.Text>
                    </Col>

                    <Col xs={24} className="join_text">
                      User Name:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.display_name}
                      </Typography.Text>
                    </Col>
                    
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    </div>
    
    );
}

export default Ban_User
