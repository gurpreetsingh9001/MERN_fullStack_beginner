import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  // this all state data and handlers are moved to it parent #App component, just like we did for counter to counters
  // state = {
  //   counters: [
  //     { id: 1, value: 0 },
  //     { id: 2, value: 0 },
  //     { id: 3, value: 0 },
  //     { id: 4, value: 0 },
  //   ],
  // };

  // handleDelete = (counterId) => {
  //   const counters = this.state.counters.filter((c) => c.id !== counterId); //all counters except with current counterID
  //   this.setState({ counters: counters }); //this.setState({counters}); also works here because both value we are updating in state and the local value are same
  // };

  // //here we will only increment one counter so map/filter will not be helpful here,we need reference/index of that component from array
  // handleIncrement = (counter) => {
  //   const counters = [...this.state.counters]; //clone counters array  //exact copy
  //   const index = counters.indexOf(counter);
  //   counter[index] = { ...counter }; //increment works without this line but it is a no no to directly modify the state // and i dont know how it is functioning
  //   counters[index].value++;
  //   this.setState({ counters });
  // };

  // //we had incremented value in counter component so its own local state was known to that component to itself and it update the DOM but now we are trying to update counter component from counters,here we have updated through the counters but the counter is still using its local state
  // //we need to change the local state of counter with current local state of counters
  // handleReset = () => {
  //   const counters = this.state.counters.map((c) => {
  //     //here we need every component or almost all to changed so we use map/filter to get list of counters and then do individual operations on them
  //     c.value = 0;
  //     return c;
  //   });
  //   this.setState({ counters }); //same as this.setState({counters:counters})
  // };

  render() {
    console.log("Counters-Rendered");
    //dont need to use this.props everywhere, just add below syntax to make {this.props.onDelete} ====> {onDelete}
    const { onReset, counters, onDelete, onIncrement } = this.props; //destructing arguments
    return (
      <div>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2" // unlike HTML 'class' in jsx its 'className'
        >
          Reset
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id} //used internally by react for identifing different components and cant be used by us as it is not available as prop
            onDelete={this.props.onDelete}
            onIncrement={onIncrement} //here we took help of destructive arguments
            // value={counter.value}
            // id={counter.id}
            counter={counter} // rather than passing individual props we are sending full object
          >
            this text will be captured if this.props.children is written in this
            components definition
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
