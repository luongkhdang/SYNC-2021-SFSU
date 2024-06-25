import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
const Modal = () => {
  const [roomName, setRoomName] = useState();
  const [roomGenre, setGenre] = useState();

  const insertData = () => {
    var data = {
      room_name: roomName,
      genre: roomGenre,
    };
    Axios.post("http://localhost:8000/api/adds/", data)
      .then((res) => {
        console.log("hi");
        setRoomName("");
        setGenre("");
      })
      .catch((er) => console.log(er));
  };
  return (
    <div>
      <Form>
        <Form.Item
          label="Roomname"
          name="roomname"
          rules={[{ required: true, message: "Please input your roomname!" }]}
        >
          <Input
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please input your genre!" }]}
        >
          <Input
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => insertData()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Modal;
