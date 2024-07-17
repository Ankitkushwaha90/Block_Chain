import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Login.css'; 

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            'username': null,
            'password': null,
            'role': null,
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password,role } = this.state;
        console.log(username)
        axios.post('http://localhost:8000/api/login', {
            username, // Destructuring for cleaner syntax
            password,
            role,
          })
          .then(response => {
            if (response.data) {
              // Assuming response.data contains user information with a 'role' property
            //   const { role } = response.data.role; // Access user object within response.data
        
              if (role === 'Voter') {
                window.location.assign("/Voter"); // Consistent path notation
              } else if (role === 'Organizer') {
                window.location.assign("/Home"); // Consistent path notation
              } else {
                console.warn('Unexpected user role:', role); // Handle unexpected roles
                alert('Login successful, but role determination failed. Please contact support.');
              }
            } else {
              alert('Incorrect Username or Password');
            }
          })
          .catch(error => {
            console.error('Error during login:', error);
          });
    
    }


    render(){
        return(
            <div>
                <header className="header">
        <h1>ELECTIFYHUB</h1>
      </header>
      
      <div className="cta-buttons">
        <Link to="/register" className="cta-button">Register</Link>
      </div>
            
            <div className="container">
            
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="username" name="username" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Username</label><br></br>
                    <input type="password" id="password" name="password" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Password</label><br></br><br></br>
                    <input type="text" id="role" name="role" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Role</label><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>   
            </div>   
        )
    }
}

export default Login;