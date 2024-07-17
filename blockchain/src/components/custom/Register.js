import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import {useHistory}  from "react-router-dom";
import { Link } from 'react-router-dom';

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    reEnterPassword: "",
    organization: "", // Added organization field
    role: "", // Added role field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;
  
  const register = () => {
    const { username, email, password, reEnterPassword, organization, role } = user;
    if (username && email && password && reEnterPassword && organization && role && password === reEnterPassword) {
      axios
        .post('http://localhost:8000/api/register', {
          username: username,
          email: email,
          password: password,
          organization: organization,
          role: role
      })
        .then((res) => {
          alert(res.data.message);
          // history("/login");
        })
        .catch((err) => {
          console.error("Registration Error:", err);
          alert("An error occurred during registration. Please try again.");
        });
    } else {
      alert("Please fill in all the required fields and ensure password match.");
    }
  };

  return (
    <div>
    <header className="header">
        <h1>ELECTIFYHUB</h1>
      </header>
      <div className="cta-buttons">
      <div className="headerText"> Already a user? </div>
        <Link to="/login" className="cta-button">Login</Link>
      </div>
    <div className="container">
    
    <div classusername="register">
    
      <h1>Register</h1>
      
      <input type="text" name="username" value={user.username} placeholder="Your username" onChange={handleChange} required />
      <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} required />
      <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange} required />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
        required
      />
      <input type="text" name="organization" value={user.organization} placeholder="Your Organization" onChange={handleChange} required /> {/* Added Organization field */}
      <select name="role" value={user.role} onChange={handleChange} required>
        {/* Added Role dropdown */}
        <option value="">Select Role</option>
        <option value="Organizer">Organizer</option>
        <option value="Voter">Voter</option>
      </select>
      <div classname="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <Link to="/login" classname="button">
        Login
      </Link>
    </div>
    </div>
    </div>
  );
};

export default Register;