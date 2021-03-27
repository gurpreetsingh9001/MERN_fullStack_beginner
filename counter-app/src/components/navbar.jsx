import React, { Component } from "react";

class NavBar extends Component {
  render() {
    console.log("NavBar-Rendered");
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="http://www.gurpreet.tech">
          Navbar{" "}
          <span className="badge badge-pill badge-secondary">
            {this.props.totalCounters}
          </span>
        </a>
      </nav>
    );
  }
}

//stateless functional component
// works like controlled class when we dont have own state data, handler methods,lifecycle hooks
const Navbar = (props) => {
  console.log("NavBar-Rendered");
  //take props here as a parameter
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="http://www.gurpreet.tech">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {props.totalCounters} {/*replace 'this.props' with just 'props' */}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
