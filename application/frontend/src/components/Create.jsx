import React, { Component, useState, setState, Link } from "react";
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
} from "antd";
import Axios from "axios";
import "../css/Create.css";
import Room from "./Room";
import { serverPath } from '../path.js' 

import {
  withRouter,
  useHistory,
  useLocation,
  Router,
  Redirect,
} from "react-router-dom";
import Footer from "./Footer";
import ToS from "./ToS"

const genreOptions = [
  { label: "Pop", value: "Pop" },
  { label: "Rock", value: "Rock" },
  { label: "Hip Hop", value: "Hip Hop" },
  { label: "Electronic", value: "Electronic" },
  { label: "Soundtrack", value: "Soundtrack" },
  { label: "Indie", value: "Indie" },
  { label: "R&B", value: "R&B" },
  { label: "K-Pop", value: "K-Pop" },
  { label: "Lo-fi", value: "Lo-fi" },
  { label: "Country", value: "Country" },
  { label: "Latin", value: "Latin" },
  { label: "Christian", value: "Christian" },
  { label: "Jazz", value: "Jazz" },
  { label: "Classical", value: "Classical" },
];

const albumList = [
  {
    title: "Pick Up Your Feelings",
    url: "./assets/1.PNG",
  },
  {
    title: "Hunger",
    url: "./assets/2.PNG",
  },
  {
    title: "no love",
    url: "./assets/3.PNG",
  },
  {
    title: "Killuminati",
    url: "./assets/4.PNG",
  },

  {
    title: "no,no",
    url: "./assets/5.PNG",
  },
  {
    title: "Crime Pays",
    url: "./assets/6.jpg",
  },
  {
    title: "Ninety",
    url: "./assets/7.jpg",
  },

  {
    title: "Souldfood",
    url: "./assets/8.jpg",
  },
  {
    title: "Violent Crimes",
    url: "./assets/9.jpg",
  },
  {
    title: "Been Waiting!",
    url: "./assets/10.jpg",
  },

  {
    title: "Leray",
    url: "./assets/11.jpg",
  },
  {
    title: "HONEST",
    url: "./assets/12.jpg",
  },
  {
    title: "WOLF",
    url: "./assets/13.jpg",
  },

  {
    title: "Trying",
    url: "./assets/14.jpg",
  },
  {
    title: "A Calabasas Freestyle",
    url: "./assets/15.jpg",
  },
  {
    title: "Father Stretch My Hands",
    url: "./assets/16.jpg",
  },

  {
    title: "Frank's Track",
    url: "./assets/17.jpg",
  },
  {
    title: "No More Parties In LA",
    url: "./assets/18.jpg",
  },
  {
    title: "Champion",
    url: "./assets/19.png",
  },
  {
    title: "Once Upon A Time(Freestyle)",
    url: "./assets/20.PNG",
  },
];
let room_url = albumList[Math.floor(Math.random() * 19)];
const { Option } = Select;

const Create = (props) => {
  console.log(props);

  const [roomName, setRoomName] = useState();
  const [roomGenre, setGenre] = useState();
  const [roomStatus, setRoomStatus] = useState(0);
  const [roomId, setRoomId] = useState(Math.floor(Math.random() * 2000000000));
  //const [tosStatus, setTosStatus] = useState(false);
  const [noOfUsers, setNoOfUsers] = useState();

  const insertData = (rn, rg,type) => {
    console.log(
      "roomName: " + rn + ", roomGenre: " + rg + ", roomId: " + roomId
    );
    var data = {
      room_name: rn,
      genre: rg,
      roomImageUrl: room_url.url,
      room_id: roomId,
      roomType : type,
      current_song_start_time: 0,
      room_song_number: 0,
      current_song_duration: 0,
    };
    console.log("insertData");
    console.log(data);
    Axios.post(serverPath.local + '/api/adds/', data) 
      .then((res) => {
        console.log("hi");
        setRoomName("");
        setGenre("");
      })
      .catch((er) => console.log(er));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const validateRN = (validRN) => {
    if (validRN && validRN.length > 0) {
      return true;
    }
    return false;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const history = useHistory();

  const updatePropHistory = () => {
    console.log(props);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(modalRoomName);
    console.log(validateRN(modalRoomName));
    console.log(modalRoomGenre);
    console.log(modalRoomStatus);
    //console.log(modalTosStatus);
    if (validateRN(modalRoomName) && modalRoomGenre //&& modalTosStatus
    ) {
      console.log("handleOk");

      props.history.push(
        "/Room/" +
        roomId
      );
    }
  };

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const history1 = useHistory();

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const [modalMessage, setModalMessage] = useState();
  const [successModalMessage, setSuccessModalMessage] = useState();
  const [modalRoomName, setModalRoomName] = useState();
  const [modalRoomGenre, setModalRoomGenre] = useState();
  const [modalRoomStatus, setModalRoomStatus] = useState();
  //const [modalTosStatus, setModalTosStatus] = useState();
  const [modalUsers, setModalUsers] = useState();

  const onClickFunks = () => {
    console.log("roomStatus");
    console.log(roomStatus);
    let users = Math.floor(Math.random() * 100);
    setNoOfUsers(users);
    const clickRoomName = roomName;
    const clickRoomGenre = roomGenre;
    const clickRoomStatus = roomStatus;
    //const clickTosStatus = tosStatus;
    const clickUsers = noOfUsers;
    setModalUsers(clickUsers);
    setModalRoomName(clickRoomName);
    setModalRoomGenre(clickRoomGenre);
    if (clickRoomStatus == 0) {
      setModalRoomStatus("Public Room");
    } else {
      setModalRoomStatus("Private Room");
    }
    //setModalTosStatus(clickTosStatus);

    setModalMessage("");
    setSuccessModalMessage("");
    if (!validateRN(clickRoomName)) {
      setModalMessage("Invalid roomname, must input at least one character.");
      showModal();
    } else if (!clickRoomGenre) {
      setModalMessage("Please select a genre from the dropdown menu.");
      showModal();
      /*} else if (!clickTosStatus) {
        setModalMessage("You must accept the terms for service.");
        showModal();*/
    } else {
      setSuccessModalMessage(
        "You have successfully created a room! Press ok to continue."
      );
      showModal();
      insertData(clickRoomName, clickRoomGenre,clickRoomStatus);
    }
  };

  /*const confirmTos = () => {
    setTosStatus(!tosStatus);
  };*/

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

  const publicRoomPopup = (
    <div>
      <p>A room searchable by anybody.</p>
    </div>
  );

  const privateRoomPopup = (
    <div>
      <p>Only accessible if room link is shared.</p>
    </div>
  );

  return (
    <div className="create-main">
      <Form
        {...formItemLayout}
        className="text-color"
      /*  style={{ marginTop: "150px", marginLeft: "400px" }} */
      >
        <Form.Item
          label="Room Name"
          name="roomname"
          rules={[
            {
              required: true,
              message: "Please input a room name.",
            },
          ]}
        //rules={[{ required: true, message: "Please input your roomname!" }]}
        >
          <Input
            placeholder="e.g. Bill's Room of Splendor"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[
            {
              required: true,
              message: "Please select a genre.",
            },
          ]}
        //rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select
            placeholder="Select genre"
            options={genreOptions}
            onChange={(value) => {
              setGenre(value);
            }}
          >
            {/*             <Option value="Rock">Rock</Option>
            <Option value="Pop">Pop</Option>
            <Option value="Classical">Classical</Option>
            <Option value="Country">Country</Option> */}
          </Select>
        </Form.Item>

        <Form.Item {...otherItemLayout}>
          <Radio.Group
            onChange={(e) => {
              setRoomStatus(e.target.value);
            }}
            value={roomStatus}
          >
            <Popover content={publicRoomPopup} placement='top'>
              <Radio className="text-color" value={0} >
                Public Room
                </Radio>
            </Popover>
            <Popover content={privateRoomPopup} placement='top'>
              <Radio className="text-color" value={1}>
                Private Room
                </Radio>
            </Popover>
          </Radio.Group>
        </Form.Item>
        {/*<Form.Item {...otherItemLayout} className="text-color">
          <Checkbox
            onChange={confirmTos}
            required="required"
            className="text-color"
          ></Checkbox>
          &nbsp;&nbsp;Click here to accept our{" "}
          <a onClick={() => showModal1()} style={{ color: "var(--color3)" }}>
            Terms of Service
          </a>
          
          </Form.Item>*/}
        <Form.Item {...otherItemLayout} style={{ marginBottom: "0px" }}>
          <Button
            type="primary"
            htmlType="submit"
            /* href={"/Room/" + roomGenre + "/" + roomName} */
            onClick={() => onClickFunks()}
            className="sync-button-color"
          >
            Submit
          </Button>
        </Form.Item>
      </Form >

      <Modal
        title="Room Creation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>
          <strong>Room Name:</strong> {modalRoomName}
        </p>
        <p>
          <strong>Genre:</strong> {modalRoomGenre}
        </p>
        <p>
          <strong>Status:</strong> {modalRoomStatus}
        </p>
        <p>{successModalMessage}</p>
        <p style={{ color: "red" }}>{modalMessage}</p>
      </Modal>

      <Modal
        title="Terms of Service"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="OK"
      >
        <ToS />
      </Modal>
    </div >
  );
};

export default withRouter(Create);
