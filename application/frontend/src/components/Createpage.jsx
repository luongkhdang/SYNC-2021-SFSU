import React, { Component, useState, setState } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  message,
  Select,
  Row,
} from "antd";
import Axios from "axios";
import "../css/Create.css";
import Room from "./Room";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import Create from "./Create";
import Footer from "./Footer";

const Createpage = (props) => {
  return (
    <div className="createpage-flex text-color">
      <div className="createpage-top-text-block">Create your own room!</div>
      <div style={{ height: "calc(100vh - 424px)", minHeight: "500px" }}>
        <Create />
      </div>
    </div>
  );
};

export default Createpage;
