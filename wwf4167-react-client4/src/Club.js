import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, Input, InputGroupText, Row, Col } from 'reactstrap';

class Club extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            count : 0,
            background : "lightgreen",
            text : "Welcome",
            plusBool: true,
            minusBool:false,
            editModal:false,
            editInfo:{clubName : "", genre:"", location:"", red:0, yellow:0},
            clubName : "", genre:"", location:"", red:0, yellow:0
        }
    }

    componentDidMount(){
            this.fetchData()
    }

    editClub=()=>
    {
        this.setState({editModal:true, editInfo:{clubName : this.state.clubName, genre:this.state.genre, location:this.state.location, red:this.state.red, yellow:this.state.yellow}});
    }
    toggleEdit = () =>
    {
        this.setState({editModal:false});
    }
    saveEdit = () =>
    {
        this.setState({editModal:false, clubName:this.state.editInfo.clubName, genre:this.state.editInfo.genre, location:this.state.editInfo.location, red:this.state.editInfo.red, yellow:this.state.editInfo.yellow}, () => {this.updateClub()});
    }

    updateName = (name) => {this.setState({editInfo:{clubName : name.target.value, genre:this.state.editInfo.genre, location:this.state.editInfo.location, red:this.state.editInfo.red, yellow:this.state.editInfo.yellow}})}
    updateLocation = (newLocation) => {this.setState({editInfo:{clubName : this.state.editInfo.clubName, genre:this.state.editInfo.genre, location:newLocation.target.value, red:this.state.editInfo.red, yellow:this.state.editInfo.yellow}})}
    updateRed=(Red)=>{this.setState({editInfo:{clubName : this.state.editInfo.clubName, genre:this.state.editInfo.genre, location:this.state.editInfo.location, red:Number(Red.target.value), yellow:this.state.editInfo.yellow}});}
    updateYellow=(Yellow)=>{this.setState({editInfo:{clubName : this.state.editInfo.clubName, genre:this.state.editInfo.genre, location:this.state.editInfo.location, red:this.state.editInfo.red, yellow:Number(Yellow.target.value)}})}
    updateGenre=(newGenre)=>{this.setState({editInfo:{clubName : this.state.editInfo.clubName, genre:newGenre.target.value, location:this.state.editInfo.location, red:this.state.editInfo.red, yellow:this.state.editInfo.yellow}})}


    updateSelf = (apiResponse) => {
        // console.log(apiResponse);
        if(apiResponse != ""){
            this.setState({clubName: apiResponse[0][0].clubname,
                        genre: apiResponse[0][0].genre,
                        location: apiResponse[0][0].location,
                        red: apiResponse[0][0].red,
                        yellow: apiResponse[0][0].yellow,
                        count : apiResponse[0][0]._count,
                        })
        }
        else{
            console.log("error getting updated data")
        }
     }

    fetchData = () =>
    {
        //Call "http://localhost:5000" directly 
        //now that CORS is set up in Flask
        fetch('http://localhost:5000/clubs/'+this.props.i)
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
                    console.log("fetch Data "+ jsonOutput[0][0]._count)
                    this.updateSelf(jsonOutput);
                 }
             )
       .catch((error) => 
               {console.log(error);
                   this.updateSelf("");
                } )
    }

    updateClub = () =>
    {
        let url = 'http://localhost:5000/clubs';
        let jData = JSON.stringify({
            id: this.props.i,
            clubName: this.state.clubName,
            genre: this.state.genre,
            location: this.state.location,
            red: this.state.red,
            yellow: this.state.yellow,
            count: this.state.count
            });
        fetch(url,
            { method: 'PUT',
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
                    this.fetchData();
                }
            )
        .catch((error) => 
            {console.log(error);
            this.fetchData();
                } )

    }

    AddRm(option)
    {
        var countVar = this.state.count;
        if(option == '+'){
            countVar += 1;
        }
        if(option == '-'){
            if(countVar >=1){
                countVar -= 1;
            }
        }
        if(countVar >= this.state.yellow && countVar < this.state.red){
            this.setState({count:countVar, background:"lightyellow", plusBool : true, text : "Warn the Bouncers!"}, () => {this.addRmAfter()});
        }
        else if(countVar >= this.state.red){
            this.setState({count:countVar, background:"lightcoral", plusBool : false, text : "No one Allowed In!"}, () => {this.addRmAfter()});

        }
        else if (countVar < this.state.yellow){
            this.setState({count:countVar, background:"lightgreen", plusBool: true, text : "Welcome"}, () => {this.addRmAfter()});
        }
    }

    addRmAfter = () =>
    {
        if(this.state.count == 0)
        {
            this.setState({minusBool:false}, () => {this.updateClub()});
        }
        else{
            this.setState({minusBool:true}, () => {this.updateClub()});
        }

    }
    

    render(){
        return(
            <Col xs="12" sm="6" md="6" lg="4" xl="3" style={{paddingBottom:'1%'}}>
                <div className="Box" style={{backgroundColor:this.state.background}}>
                    <Button style={{float:'right', margin:"5px"}} size='sm' onClick={this.editClub}>edit</Button>
                    <br></br>
                    <br></br>
                    <p>{this.state.clubName}</p>
                    <p>{this.state.location}</p>
                    <p>Genre: {this.state.genre}</p>
                    <p>Count: {this.state.count}</p>
                    <p>{this.state.text}</p>
                    <Button onClick={() => this.AddRm('+')} size='lg' disabled={!this.state.plusBool} color='success'>+</Button>
                    <Button onClick={() => this.AddRm('-')} size='lg' disabled={!this.state.minusBool} color='danger'>-</Button>
                </div>
                            {/*EDIT MODAL*/}
                            <Modal isOpen={this.state.editModal}>
                            <ModalHeader toggle={this.toggleEdit}>Edit: {this.state.clubName}</ModalHeader>
                            <ModalBody>
                                <InputGroup>
                                <InputGroupText>Club Name</InputGroupText>
                                <Input placeholder="Club Name" value={this.state.editInfo.clubName} onChange={this.updateName}/>
                                </InputGroup>
                                <InputGroup>
                                <InputGroupText>Location</InputGroupText>
                                <Input placeholder="Location" value={this.state.editInfo.location} onChange={this.updateLocation}/>
                                </InputGroup>
                                <InputGroup>
                                <InputGroupText>Genre</InputGroupText>
                                <Input placeholder="Genre" value={this.state.editInfo.genre} onChange={this.updateGenre}/>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText htmlFor="exampleNumber">
                                    Max Occupancy
                                    </InputGroupText>
                                    <Input placeholder="0-9999" type="number"  value={this.state.editInfo.red} onChange={this.updateRed}/>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText htmlFor="exampleNumber">
                                    Warning Occupancy
                                    </InputGroupText>
                                    <Input placeholder="0-9999" type="number" value={this.state.editInfo.yellow} onChange={this.updateYellow}/>
                                </InputGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                                <Button color="primary" onClick={this.saveEdit}>Save</Button>
                            </ModalFooter>
                            </Modal>
            </Col>
        );
    }
}

export default Club;