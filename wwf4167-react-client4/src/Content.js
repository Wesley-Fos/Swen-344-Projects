import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import Club from "./Club";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, Input, InputGroupText, Row, Col} from 'reactstrap';

class Content extends Component
{


    constructor(props)
    {
        super(props);
        this.state = {
            checked : "",
            addModal:false,
            addInfo:{clubName : "", genre:"", location:"", red:0, yellow:0},
            clubs : []
        }
    }

    addClub()
    {
        this.setState({addModal:true, addInfo:{clubName : "", genre:"", location:"", red:0, yellow:0}});
    }
    toggleAdd = () =>
    {
        this.setState({addModal:false})
    }
    saveAdd = () =>
    {
        
        let url = 'http://localhost:5000/clubs';
        let jData = JSON.stringify({
            clubName: this.state.addInfo.clubName,
            genre: this.state.addInfo.genre,
            location: this.state.addInfo.location,
            red: this.state.addInfo.red,
            yellow: this.state.addInfo.yellow, 
            count : 0
            });
        fetch(url,
            { method: 'POST',
            body: jData,
            headers: {"Content-type": "application/json; charset=UTF-8"}        
            })
        .then(
            (response) => 
            {
                if (response.status === 200)
                    return (response.json()) ;
                else
                    return ([ ["status ", response.status]]);
            }
            )//The promise response is returned, then we extract the json data
        .then ((jsonOutput) => //jsonOutput now has result of the data extraction, but don't need it in this case
                {
                    this.fetch();
                }
            )
        .catch((error) => 
            {console.log(error);
            this.fetch();
            } )

        this.setState({addModal:false})
    }

    updateName = (name) => {this.setState({addInfo:{clubName : name.target.value, genre:this.state.addInfo.genre, location:this.state.addInfo.location, red:this.state.addInfo.red, yellow:this.state.addInfo.yellow}})}
    updateLocation = (newLocation) => {this.setState({addInfo:{clubName : this.state.addInfo.clubName, genre:this.state.addInfo.genre, location:newLocation.target.value, red:this.state.addInfo.red, yellow:this.state.addInfo.yellow}})}
    updateRed=(Red)=>{this.setState({addInfo:{clubName : this.state.addInfo.clubName, genre:this.state.addInfo.genre, location:this.state.addInfo.location, red:Number(Red.target.value), yellow:this.state.addInfo.yellow}});}
    updateYellow=(Yellow)=>{this.setState({addInfo:{clubName : this.state.addInfo.clubName, genre:this.state.addInfo.genre, location:this.state.addInfo.location, red:this.state.addInfo.red, yellow:Number(Yellow.target.value)}})}
    updateGenre=(newGenre)=>{this.setState({addInfo:{clubName : this.state.addInfo.clubName, genre:newGenre.target.value, location:this.state.addInfo.location, red:this.state.addInfo.red, yellow:this.state.addInfo.yellow}})}

    // NEW STUFF FOR CLIENT 4
    updateData = (apiResponse) => {
        this.setState({clubs: apiResponse})
     }
 
 
    fetch = () =>
    {
        //Call "http://localhost:5000" directly 
        //now that CORS is set up in Flask
        fetch('http://localhost:5000/clubs')
        .then(
            (response) => 
            {
               if (response.status === 200)
               {
                  return (response.json()) ;
               }
               else
               {
                   console.log("HTTP error:" + response.status + ":" +  response.statusText);
                   return ([ ["status ", response.status]]);
               }
            }
            )//The promise response is returned, then we extract the json data
        .then ((jsonOutput) => //jsonOutput now has result of the data extraction
                 {
                     this.updateData(jsonOutput);
                 }
             )
       .catch((error) => 
               {console.log(error);
                   this.updateData("");
                } )
    }

    mapClubs =() =>
    {
        if((this.state.clubs != null) && (this.state.clubs.length > 0))
        {
            return(
                    this.state.clubs.map((club, index) => 
                    <Club key={index} i={club[0].id}></Club>
                    )
            )
        }
        else
        {
            console.log("Empty content");
            return(
            <div style={{textAlign: 'center', alignItems: 'center'}}>
            <p>Error: No Clubs Found</p>
            <img src="https://i.kym-cdn.com/entries/icons/facebook/000/028/666/Screen_Shot_2019-02-22_at_1.24.28_PM.jpg"></img>
            </div>
        )
        }
    }
    
    componentDidMount(){
        this.fetch();
    }



    render()
    {
        return(
        <div>
            <div>
                <Button size="lg" onClick={() =>this.addClub()} style={{marginBottom:"3%", marginLeft:"1%"}}>Add New Club!</Button>
                <Row >
                    {       
                        this.mapClubs()
                    }
                </Row>
                
                


                {/*ADD MODAL*/}
                <Modal  isOpen={this.state.addModal}>
                <ModalHeader toggle={this.toggleAdd}>Add new club.</ModalHeader>
                <ModalBody>
                            <InputGroup>
                            <InputGroupText>Club Name</InputGroupText>
                            <Input placeholder="Club Name" onChange={this.updateName}/>
                            </InputGroup>
                            <InputGroup>
                            <InputGroupText>Location</InputGroupText>
                            <Input placeholder="Location" onChange={this.updateLocation}/>
                            </InputGroup>
                            <InputGroup>
                            <InputGroupText>Genre</InputGroupText>
                            <Input placeholder="Genre" onChange={this.updateGenre}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupText>
                                Max Occupancy
                                </InputGroupText>
                                <Input placeholder="0-9999" type="number" onChange={this.updateRed}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupText>
                                Warning Occupancy
                                </InputGroupText>
                                <Input placeholder="0-9999" type="number" onChange={this.updateYellow}/>
                            </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
                        <Button color="primary" onClick={() => this.saveAdd(this.state.addInfo)}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
    </div>
        )
    }
} 

export default Content;