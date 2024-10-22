import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

class Header extends Component
{
    render()
    {
        return(
        <div>
            <h1>Night Club Capacity Tracker</h1>
            <h3>Each time someone enters/ leaves the club, select the correct club and click the appropriate button</h3>
        </div>
        )
    }
} 

export default Header;