import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

//interceptor is used to intercept requests and responses and to handle there errors at one place
// two types of arguments first one for success and second for error 
//here we are not intercepting successful response which can be logged for auditing purposes
axios.interceptors.response.use(null, error => {

  //expected errors are occured by client and are in range of 400 to 500
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //unexpected errors like (network down, server down, db down, bug)
  if (!expectedError) {
    logger.log(error);  // log for raven library file "logService"
    toast.error("An unexpected error occurred.");  //friendly error to user
  }

  //return reject promise to give control to catch block
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};