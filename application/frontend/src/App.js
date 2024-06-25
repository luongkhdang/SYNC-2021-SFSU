import React, { Component } from "react";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Modal from "./components/Modal";
import Createpage from "./components/Createpage";
import Create from "./components/Create";
import Join from "./components/Join";
import Room from "./components/Room";
import Chatroom from "./components/Chatroom";
import NavBar from "./components/navbar";
import Contactus from "./components/Contactus";
import Aboutus from "./components/Aboutus";
import axios from "axios";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import BackgroundImage from "./assets/bgimages/test.png";
import Ban_User from "./components/Ban_User";
import DeleteRoom from "./components/DeleteRoom";
import NotFoundPage from "./components/404"
import ContactusLoggedIn from "./components/ContactusLoggedIn"
import FooterLoggedIn from "./components/FooterLoggedIn"
import AboutusLoggedIn from "./components/AboutusLoggedIn"

class App extends React.Component {
  render() {
    const PagesWithNavBar = () => {
      {/* Logged in */}
      return (
        <div>
          <NavBar />
          <Switch>
            <Route path="/Home" exact component={Home} />
            <Route path="/404" exact component={NotFoundPage} />
            <Route path="/Createpage" exact component={Createpage} />
            <Route path="/Join" exact component={Join} />
            <Route path="/Chatroom" exact component={Chatroom} />
            <Route
              path="/Room/:roomId"
              exact
              component={Room}
            />
            <Route path="/Contactus" exact component={ContactusLoggedIn}></Route>
            <Route path="/Aboutus" exact component={AboutusLoggedIn}></Route>
            <Route path="/banuser" exact component={Ban_User}></Route>
            <Route path="/deleteroom" exact component={DeleteRoom}></Route>
            <Redirect to="/404"/>
          </Switch>
          <FooterLoggedIn />
        </div>
      );
    };
    {/* Not Logged in */}
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/Contact" exact component={Contactus}></Route>
          <Route path="/About" exact component={Aboutus}></Route>
          <Route component={PagesWithNavBar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
