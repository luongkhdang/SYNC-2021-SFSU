import React from "react";
import Card from "react-bootstrap/Card";
import { CardDeck, Button } from "react-bootstrap";
import albumCover from "../assets/image0.png";
import Rebecca from "../assets/profile pics/rebecca.png";
import Bryan from "../assets/profile pics/bryan.png";
import Ashwini from "../assets/profile pics/ashwini.png";
import Hirva from "../assets/profile pics/hirva.png";
import Luong from "../assets/profile pics/luong.png";
import Vishakha from "../assets/profile pics/vishakha.png";
import Malcolm from "../assets/profile pics/malcolm.png";
import Footer from "./Footer";

//import Button from '@material-ui/core/Button';

const Aboutus = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="logo-flex">
        <figcaption className="logo">
          <a href="/">
            <img
              src="../assets/logoImage2.png"
              style={{ width: "135px", marginRight: "10px" }}
            ></img>
          </a>
        </figcaption>
      </div>
      <div class="main" style={{paddingBottom: 300}}>

        <p style={{ padding: "30px", fontSize: "65px" }}>The Creators! </p>
        <CardDeck style={{ justifySelf: "center" }}>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Rebecca} />
            <Card.Body>
              <Card.Title>Rebecca Zumaeta</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Team Lead
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Rebecca!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/rezum"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Rebeccas's github
            </Button>
            </Card.Body>
          </Card>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Bryan} />
            <Card.Body>
              <Card.Title>Bryan Fetner</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Frontend Lead
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Bryan!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/bfetner"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Bryan's github
            </Button>
            </Card.Body>
          </Card>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Ashwini} />
            <Card.Body>
              <Card.Title>Ashwini Managuli</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Backend Lead
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Ashwini!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/Ashwinigm"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Ashwini's github
            </Button>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />
        <CardDeck style={{ justifySelf: "center" }}>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Malcolm} />
            <Card.Body>
              <Card.Title>Malcolm Angelo De Villar</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Frontend member
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Malcolm!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/mdevillar0"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Malcolm's github
            </Button>
            </Card.Body>
          </Card>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Hirva} />
            <Card.Body>
              <Card.Title>Hirva Patel</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Frontend member
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Hirva!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/Hirva98"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Hirva's github
            </Button>
            </Card.Body>
          </Card>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Luong} />
            <Card.Body>
              <Card.Title>Luong Dang</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Backend member
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Luong!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/luongdang0701"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Luong's github
            </Button>
            </Card.Body>
          </Card>
          <Card style={{ maxWidth: 400, backgroundColor: "#393e46" }}>
            <Card.Img variant="top" src={Vishakha} />
            <Card.Body>
              <Card.Title>Vishakha Tyagi</Card.Title>
              <Card.Subtitle style={{ fontStyle: "italic", fontSize: 14 }}>
                Backend member
            </Card.Subtitle>{" "}
              <br />
              <Card.Text>Hi, I am Vishakha!</Card.Text>
              <Button
                variant="primary"
                href="https://github.com/Vishakha2002"
                style={{ backgroundColor: "#00adb5" }}
              >
                Go to Vishakha's github
            </Button>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Aboutus;
