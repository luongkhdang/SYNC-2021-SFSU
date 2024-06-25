import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Modal, Button } from "antd";
import { Link, useHistory, Redirect } from "react-router-dom";
import Axios from "axios";

import { Header } from "antd/lib/layout/layout";
import FAQ from "./FAQ";
import "../css/Landing.css";
import FaqComponent from "./FaqComponent";
import Footer from "./Footer";
import ToS from "./ToS";
import "../css/Create.css";
import UserInfo from "./UserInfo";

import { SpotifyApiContext, User, UserTop } from "react-spotify-api";
import Cookies from "js-cookie";
import { SpotifyAuth, Scopes, SpotifyAuthListener } from "react-spotify-auth";
import { Component } from "react";
import { serverPath } from '../path.js'

const Landing = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  const updateCurrentUser = (updateUserInfo) => {
    const stringUpdateUserInfo = JSON.stringify(updateUserInfo);
    localStorage.setItem("currentUser", stringUpdateUserInfo);
  };

  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);
    return retrieveUserInfo;
  };

  const [spotifyAuthToken, setSpotifyAuthToken] = useState(
    Cookies.get("spotifyAuthToken")
  );

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get("spotifyAuthToken"));
    /* console.log(Scopes.all); */
  }, [Cookies.get("spotifyAuthToken")]);

  const handleTokenRetrieval = (token) => {
    var user = UserInfo;

    Axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        user.userId = res.data.id;
        user.displayName = res.data.display_name;
        if (res.data.images.length !== 0) {
          user.profilePictureUrl = res.data.images[0].url;
        } else {
          user.profilePictureUrl = "none";
        }
        user.spotifyToken = token;
        user.product = res.data.product;
        setUserInfo(user);
        updateCurrentUser(user);

        var data = {
          user_id: user.userId,
          display_name: user.displayName,
          profile_pic: user.profilePictureUrl,
          admin_status: 0,
          ban_status: 0,
          ban_comment: "none"
        };
        Axios.post(serverPath.local + '/api/users/', data) 
          .then((res) => {})
          .catch((er) => {
            
          });

        history.push("/Home");
      })
      .catch((er) => {
        
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showErrorModal = () => {
    setIsErrorVisible(true);
  };

  const handleOk = () => {
    history.push("/Home");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleErrorCancel = () => {
    setIsErrorVisible(false);
  };

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

  const [tosStatus, setTosStatus] = useState(false);
  const [modalTosStatus, setModalTosStatus] = useState();
  const [modalMessage, setModalMessage] = useState();

  const confirmTos = () => {
    setTosStatus(!tosStatus);
  };

  const onClickFunks = () => {
    const clickTosStatus = tosStatus;

    setModalTosStatus(clickTosStatus);

    setModalMessage("");
    if (!clickTosStatus) {
      setModalMessage("You must accept the terms for service.");
      showErrorModal();
    } else {
      history.push("/Home");
    }
  };

  useEffect(() => {
    var token = Cookies.get("spotifyAuthToken");
    if(!token) {
      localStorage.removeItem("currentUser");
    }
  })

  var shallRedirect;
  const redirectUser = retrieveCurrentUser();
  if (redirectUser) {
    shallRedirect = retrieveCurrentUser().spotifyToken;
  }
  if (shallRedirect) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="main-landing">
      <SpotifyAuthListener
      /* onAccessToken={(token) => {
          console.log("SpotifyAuthListener");
          Axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => {
              userInfo.userId = res.data.id;
              userInfo.displayName = res.data.display_name;
              userInfo.profilePictureUrl = res.data.images[0].url;
              userInfo.administratorStatus = false;
              userInfo.spotifyToken = token;
              updateCurrentUser(userInfo);
              history.push("/Home");
            })
            .catch((er) => {
              console.log(er);
            });
        }} */
      />
      <figure className="position-relative">
        <div className="logo-flex">
          <figcaption className="logo">
            <img
              src="../assets/logoImage2.png"
              style={{ width: "135px", marginRight: "10px" }}
            ></img>
          </figcaption>
        </div>

        {Cookies.get("spotifyAuthToken") ? (
          <SpotifyApiContext.Provider value={spotifyAuthToken}>
            <div className="fig-flex">
              {handleTokenRetrieval(spotifyAuthToken)}
              <User>
                {(user, loading, error) =>
                  user && user.data ? (
                    <div>{spotifyAuthToken}</div>
                  ) : (
                    <div>Loading...</div>
                  )
                }
              </User>
            </div>
          </SpotifyApiContext.Provider>
        ) : (
          <div className="fig-flex">
            <figcaption className="banner">Welcome to SYNC!</figcaption>
            <figcaption className="subtext1">
              Share your spotify songs in one of our listening rooms!
            </figcaption>
            <figcaption className="subtext2">
              Listen to music and chat with friends and the community!
            </figcaption>
            <figcaption className="landingButton">
              {!tosStatus && (
                <Link
                  class="btn btn-dark sync-button-color landingButton-text"
                  size="lg"
                  onClick={() => onClickFunks()}
                >
                  Login with Spotify!
                </Link>
              )}
              {tosStatus && (
                <SpotifyAuth
                  redirectUri={"http://18.219.141.181:3000"}
                  clientID="ad4f63abc34f445d9f82549d5dcfeb67"
                  scopes={[
                    Scopes.userReadPrivate,
                    Scopes.userReadEmail,
                    Scopes.streaming,
                    Scopes.userReadPlaybackState,
                    Scopes.userModifyPlaybackState,
                    Scopes.userTopRead,
                    Scopes.userReadRecentlyPlayed,
                  ]}
                  title={"Login with Spotify!"}
                  showDialog={true}
                  noLogo={true}
                  btnClassName="btn btn-dark sync-button-color landingButton-text"
                />
              )}
            </figcaption>

            <Form>
              <Form.Item className="text-color">
                <Checkbox
                  onChange={confirmTos}
                  required="required"
                  className="text-color"
                ></Checkbox>
                &nbsp;&nbsp;Click here to accept our{" "}
                <a
                  onClick={() => showModal()}
                  style={{ color: "var(--color3)" }}
                >
                  Terms of Service
                </a>
                .
              </Form.Item>
            </Form>
          </div>
        )}
      </figure>
      <Modal
        title="Terms of Service"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="OK"
      >
        <ToS />
      </Modal>
      <Modal
        visible={isErrorVisible}
        onOk={handleErrorCancel}
        onCancel={handleErrorCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="OK"
      >
        <p style={{ color: "red" }}>
          You must accept the Terms of Service to continue.
        </p>
      </Modal>
      <FaqComponent />
      <Footer />
    </div>
  );
};

export default Landing;
