import React, { Component } from "react";
import "./App.css";
import EditingForm from "./EditingForm";
import Type from "./Type.js";
import Fade from "react-reveal/Fade";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css"
          rel="stylesheet"
        />

        <div className="container">
          <script src="https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css"
            rel="stylesheet"
          />

          <img
            src="https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260alt="
            className="welcome-pic"
          />
          <Fade top>
            <div className="logo-text">RevTek</div>
          </Fade>

          <div className="welcome-text">
            <Type
              strings={[
                "Providing companies with exceptional talent.",
                "Empowering students to change the world."
              ]}
              loopDelay={7000}
              speed={50}
              breakLines={true}
              autoStart={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
