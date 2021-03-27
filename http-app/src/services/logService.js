// import Raven from "raven-js";

//raven is from sentry.io where you will create and account and get api key
//after that the logs will be automatically available on sentry.io website

function init() {
  // Raven.config("ADD YOUR OWN API KEY", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  // Raven.captureException(error);
}

export default {
  init,
  log
};