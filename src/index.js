import React, { Component } from 'react';   //React is a default export so we dont need {} around it but all other functions i.e objects are named export so we need {} 
import ReactDOM from 'react-dom';           //  export default ClassName {....}  # default export        // export ClassName {....}  #named export
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

