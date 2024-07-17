
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import './Home.css'; // Import the CSS file for styling
const { Title, Paragraph } = Typography;



const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>ELECTIFYHUB</h1>
      </header>
      
      <div className="cta-buttons">
        <Link to="/choose" className="cta-button">Elections</Link>
        <Link to="/newElection" className="cta-button">New Election</Link>
        <Link to="/elections" className="cta-button">Manage Elections</Link>
        <Link to="/" className="cta-button">Log Out</Link>
      </div>
      <div className="background-image"></div>
      <div className="welcome-line">
        <p>Welcome to ELECTIFYHUB</p>
      </div>
      <Paragraph style={{ fontSize: '18px', fontWeight: 'bold', maxWidth: '600px', margin: '0 auto 30px' }}>
        Empowering Democracy with Secure Voting
      </Paragraph>
      <center><div style={{ marginBottom: '30px' }}>
        <Paragraph>
        Get started by logging in or registering to vote for various positions, such as school monitors, organizational roles, and more.
        </Paragraph>
        <Paragraph>
          Explore the features and benefits of ElectifyHub's secure voting system.
        </Paragraph>
      </div>
      <hr style={{ marginBottom: '30px' }} />
      <div style={{ marginBottom: '20px' }}>
        <Title level={4}><b>Why Choose ElectifyHub?</b></Title>
        <Paragraph>
          - Secure and transparent voting process
        </Paragraph>
        <Paragraph>
          - Easy registration and user-friendly interface
        </Paragraph>
        <Paragraph>
          - Accessible from anywhere, anytime
        </Paragraph>
        <Paragraph>
          - Real-time voting results and analytics
        </Paragraph>
      </div>
      <div></div></center>
      <footer className="footer">
        <p>&copy; 2024 ELECTIFYHUB. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;