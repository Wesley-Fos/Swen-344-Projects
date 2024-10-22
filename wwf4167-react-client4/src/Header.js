import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

class Header extends Component
{
    render()
    {
        return(
        <div style={{textAlign:'center', marginBottom:"1%"}}>
            <h1>Night Club Capacity Tracker</h1>
            <h3>Each time someone enters/ leaves the club, select the correct club and click the appropriate button</h3>
        </div>
        )
    }
} 

export default Header;