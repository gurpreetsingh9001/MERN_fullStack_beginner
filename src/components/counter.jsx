import React, { Component } from 'react';

class Counter extends Component {
    //include data that component needs
    state = {
        count:0
    };
    render() { 
        return (
            //alternate to div is to use react.fragment(div shows extra in dom tree but not fragment) we need either of the tags due to multiline tags
            <div>
                <span className="badge badge-primary m-2">{this.formatCount()}</span>
                <button>Increment</button>
            </div>
            );
    }

    formatCount(){
        const {count} = this.state;
        return count===0?'Zero':count;
    }
}
 
export default Counter;