import React, { Component } from 'react';
import NavBar from './components/navbar';
import './App.css';
import Counters from './components/counters';

class App extends Component {

  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  //MOUNTING hook,called first and good place to initialise state data
  constructor() {  //pass props in here if we want to set state data from props
    super(); //super(props) if props are passed;
    //this.state.variable=this.props.variablee;
    console.log('App-Constructor');
  }

  //is called after our component is render in DOM
  //perfect place to make AJAX calls to server
  componentDidMount() {
    console.log("App-Mounted");
  }

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId); //all counters except with current counterID
    this.setState({ counters: counters }); //this.setState({counters}); also works here because both value we are updating in state and the local value are same
  };

  //here we will only increment one counter so map/filter will not be helpful here,we need reference/index of that component from array
  handleIncrement = (counter) => {
    const counters = [...this.state.counters]; //clone counters array  //exact copy
    const index = counters.indexOf(counter);
    counter[index] = { ...counter }; //increment works without this line but it is a no no to directly modify the state // and i dont know how it is functioning
    counters[index].value++;
    this.setState({ counters });
  };

  //we had incremented value in counter component so its own local state was known to that component to itself and it update the DOM but now we are trying to update counter component from counters,here we have updated through the counters but the counter is still using its local state
  //we need to change the local state of counter with current local state of counters
  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      //here we need every component or almost all to changed so we use map/filter to get list of counters and then do individual operations on them
      c.value = 0;
      return c;
    });
    this.setState({ counters }); //same as this.setState({counters:counters})
  };

  render() {
    console.log("App-Rendered");
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length} />
        <main className="container">
          <Counters counters={this.state.counters} onReset={this.handleReset} onIncrement={this.handleIncrement} onDelete={this.handleDelete} />
        </main>
      </React.Fragment >
    );
  }
}
export default App;
