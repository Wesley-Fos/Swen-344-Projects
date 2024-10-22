import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

class Club extends React.Component{

    constructor(props)
    {
        super(props);
    }

    render(){
        return(
        <div className="Box" style={{backgroundColor:this.props.Background}}>
          <p>{this.props.clubName}</p>
          <p>Count: {this.props.count}</p>
          <p>{this.props.text}</p>
        </div>
        );
    }
}

export default Club;