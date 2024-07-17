import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class NewElection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: '',
            election_organizer: '',
            election_password: '',
        };
    }

    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { election_name, election_organizer, election_password } = this.state;
        console.log(election_name);
        axios.post('http://localhost:8000/api/electionName', {
            election_name: election_name,
            election_organizer: election_organizer,
            election_password: election_password
        })
        .then(function(response){ 
            window.location.assign('/');
        })
        .catch(function(err){
            console.error(err);
        });
    }

    render(){
        return(
            <div>
                <header className="header">
        <h1>ELECTIFYHUB</h1>
      </header>
      
      <div className="cta-buttons">
        <Link to="/choose" className="cta-button">Elecions</Link>
        <Link to="/newElection" className="cta-button">New Election</Link>
        <Link to="/elections" className="cta-button">Manage Elections</Link>
        <Link to="/" className="cta-button">Log Out</Link>
            </div>
            <div className="container">
                <h4>Create New Election</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="election_name" name="election_name" onChange={this.handleInputChange} required/>
                        <label htmlFor="name">Election Name</label><br></br>
                        <input type="text" id="election_organizer" name="election_organizer" onChange={this.handleInputChange} required/>
                        <label htmlFor="name">Election Organizer</label><br></br>
                        <input type="password" id="election_password" name="election_password" onChange={this.handleInputChange} required/>
                        <label htmlFor="name">Election Password</label><br></br><br></br>
                        <button className="btn blue darken-2" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
            </div>
            </div>
        )
    }
}

export default NewElection;