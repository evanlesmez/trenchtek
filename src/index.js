import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouteC from "./RouteC.js";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<RouteC />, document.getElementById("root"));
registerServiceWorker();
