import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logService";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

logger.init(); //intiate logger service //here it is Raven 

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
