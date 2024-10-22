import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import Club from "./Club";

class Content extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            checked : "",
            CA:{clubName : "Club Arcane", text : "Welcome", Background : "lightgreen", yellow : 70, red : 100, count:0},
            CU:{clubName : "Club Underground", text : "Welcome", Background : "lightgreen", yellow : 30, red : 50, count:0},
            CS:{clubName : "Club Soda", text : "Welcome", Background : "lightgreen", yellow : 12, red : 20, count:0},
            S52:{clubName : "Studio 52", text : "Welcome", Background : "lightgreen", yellow : 32, red : 52, count:0},

        }
    }

    RadioChange(event)
    {
        this.state.checked = event.target.value;
    }

    RadioMap(option){
        if(this.state.checked == "CA"){
            var countVar = this.state.CA.count;
            if(option == '+'){
                countVar += 1;
            }
            if(option == '-'){
                if(countVar >=1){
                    countVar -= 1;
                }
            }
            if(countVar >= 70 && countVar < 100){
                this.setState({CA:{clubName : "Club Arcane", text : "Warn the bouncers…", Background : "lightyellow", yellow : 70, red : 100, count:countVar}});
            }
            else if(countVar >= 100){
                this.setState({CA:{clubName : "Club Arcane", text : "No one allowed in!", Background : "lightcoral", yellow : 70, red : 100, count:countVar}});
            }
            else if (countVar < 70){
                this.setState({CA:{clubName : "Club Arcane", text : "Welcome", Background : "lightgreen", yellow : 70, red : 100, count:countVar}});
            }

        }
        if(this.state.checked == "CU"){
            var countVar = this.state.CU.count;
            if(option == '+'){
                countVar += 1;
            }
            if(option == '-'){
                if(countVar >=1){
                    countVar -= 1;
                }
            }
            if(countVar >= 30 && countVar < 50){
                this.setState({CU:{clubName : "Club Underground", text : "Warn the bouncers…", Background : "lightyellow",  count:countVar}});
            }
            else if(countVar >= 50){
                this.setState({CU:{clubName : "Club Underground", text : "No one allowed in!", Background : "lightcoral",  count:countVar}});
            }
            else if (countVar < 30){
                this.setState({CU:{clubName : "Club Underground", text : "Welcome", Background : "lightgreen", count:countVar}});
            }
        }
        if(this.state.checked == "CS"){
            var countVar = this.state.CS.count;
            if(option == '+'){
                countVar += 1;
            }
            if(option == '-'){
                if(countVar >=1){
                    countVar -= 1;
                }
            }
            if(countVar >= 12 && countVar < 20){
                this.setState({CS:{clubName : "Club Soda", text : "Warn the bouncers…", Background : "lightyellow",  count:countVar}});
            }
            else if(countVar >= 20){
                this.setState({CS:{clubName : "Club Soda", text : "No one allowed in!", Background : "lightcoral",  count:countVar}});
            }
            else if (countVar < 12){
                this.setState({CS:{clubName : "Club Soda", text : "Welcome", Background : "lightgreen", count:countVar}});
            }
        }
        if(this.state.checked == "S52"){
            var countVar = this.state.S52.count;
            if(option == '+'){
                countVar += 1;
            }
            if(option == '-'){
                if(countVar >=1){
                    countVar -= 1;
                }
            }
            if(countVar >= 32 && countVar < 52){
                this.setState({S52:{clubName : "Studio 52", text : "Warn the bouncers…", Background : "lightyellow",  count:countVar}});
            }
            else if(countVar >= 52){
                this.setState({S52:{clubName : "Studio 52", text : "No one allowed in!", Background : "lightcoral",  count:countVar}});
            }
            else if (countVar < 32){
                this.setState({S52:{clubName : "Studio 52", text : "Welcome", Background : "lightgreen", count:countVar}});
            }
        }
    }
    render()
    {
        return(
    <div>
            
      <div className="Boxes">
        <Club clubName={this.state.CA.clubName} text={this.state.CA.text} count={this.state.CA.count} Background={this.state.CA.Background}></Club>
        <Club clubName={this.state.CU.clubName} text={this.state.CU.text} count={this.state.CU.count} Background={this.state.CU.Background}></Club>
        <Club clubName={this.state.CS.clubName} text={this.state.CS.text} count={this.state.CS.count} Background={this.state.CS.Background}></Club>
        <Club clubName={this.state.S52.clubName} text={this.state.S52.text} count={this.state.S52.count} Background={this.state.S52.Background}></Club>

      </div>
    <h3 style={{marginTop: "3%"}}>Club Select</h3>
      <div className="Updater" onChange={this.RadioChange.bind(this)}>
          <input type="radio" value="CA" name="radio"></input>
          <label htmlFor="CARadio">Club Arcane</label>
          <br/>
          <input type="radio" value="CU" name="radio"></input>
          <label htmlFor="CURadio">Club Underground</label>
          <br/>
          <input type="radio" value="CS" name="radio"></input>
          <label htmlFor="CSRadio">Club Soda</label>
          <br/>
          <input type="radio" value="S52" name="radio"></input>
          <label htmlFor="S52Radio">Studio 52</label>
        <br/>
        <button onClick={() => this.RadioMap('-')}>-</button>
        <button onClick={() => this.RadioMap('+')}>+</button>
      </div>
    </div>
        )
    }
} 

export default Content;