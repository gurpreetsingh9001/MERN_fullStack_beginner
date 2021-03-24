import React, { Component } from "react";

class Counter extends Component {
  //local state of this component is deleted and it is a controlled component,it will recieve all data via props and raises events whenever the data needs to be changed
  //include data that component needs
  // state = {
  //   value: this.props.counter.value, //this.props values are read only
  // };

  //it is like a trigger where we can check old props and state and compare it with new props and states
  // to make calls to server effectively only when there are changes
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps in counter", prevProps);
    console.log("prevState in counter", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      //ajax call to get new data from server
    }
  }

  //when something is getting removed from virtual DOM then this is called
  //it is used like in case of doDelete the counter component which is deleted will fire this
  //here we can do cleanup stuff like removing its handler or taking care of memory leak
  componentWillUnmount() {
    console.log("Counter-UnMounted");
  }

  render() {
    console.log("Counter-Rendered");
    //console.log("props", this.props); //props has all the properties/attributes passes to it ,key will not be a part of it because key is just reference for every list element

    return (
      //alternate to div is to use react.fragment(div shows extra in dom tree but not fragment) we need either of the tags due to multiline tags
      <div>
        {/*  {this.props.children}  children contain the inline content between opening and closing tag of calling compenent #used in cases like dialog boxes where it is called from differnt points and each caller will pass some different form of value*/}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        {/*<button onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button> {/*if we want to pass arguments to handleIncrement method we cant do that with this line because we are not calling handleIncrement but just passing this.handleIncrement which is a reference to that function*/}
        {/*so we have to create a inline arrow funtion which will return its reference,and this arrow function will pass arguments to our main funtion which will do the job of increment*/}
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => {
            this.props.onDelete(this.props.counter.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  // 1.    //need to create constructor to bind event handlers to 'this' in every component where we use event handlers
  // constructor(){
  //     super();//call constructor of parent class before child class
  //     this.handleIncrement =this.handleIncrement.bind(this);  //bind method will return a new instance of handleIncrement function
  // }

  //in event handler we dont have reference to 'this' it is undefined for strict mode and return windows object if non strict but not this component
  //for every event handler we need to add this.eventHandlerName =this.eventHandlerName.bind(this); in constructor
  //      handleIncrement(){
  //            console.log("increment clicked");
  //      }

  //  We can use arrow function to avoid constructor method
  // handleIncrement = (product) => {
  //   //this.state.value++;   //value is changed but react does not know about that yet
  //   // we have to specifically tell React what is changed
  //   //setState() will call render method every time in the back whenever the state is changed and render will update the virtual DOM where changes has occured
  //   this.setState({ value: this.state.value + 1 });
  // };

  //dynamic ui if value is zero than yellow otherwise blue
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    ////instead of writing this.state.value everywhere we want to use value we use this
    //its like const value=this.state.value;
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
