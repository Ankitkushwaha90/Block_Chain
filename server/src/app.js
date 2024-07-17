const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./models/admin')
const md5 = require('md5')
const electionName = require('./models/electionName')
const mongoose = require('./db/mongoose'); // Assuming mongoose connection is in db/mongoose.js
const users = require('./models/userScehma'); // Assuming user schema is defined in userScehma.js

const app = express();

// Enable CORS for requests from localhost:3000 with credentials
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Parse incoming JSON and URL-encoded form data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Route handlers (replace with your actual logic)
app.get('/', (req, res) => {
  res.json('Works!');
});


app.post('/api/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password, organization, role } = req.body;

    // More secure password hashing (consider using bcryptjs)
    // const hashedPassword = await bcrypt.hash(password, 10); // Replace md5 with bcrypt

    // Create new user using Mongoose schema
    const newUser = await userScehma.create({
      username,
      email,
      password,
      organization,
      role,
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);

    // Handle Mongoose validation errors (if applicable)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: messages[0] }); // Replace with all messages if needed
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  }
});

// ... other routes (app.get('/api/electionName'), app.post('/api/electionName'), etc.)
app.get('/api/electionName', function(req, res) {
  var electionNames = []
  var electionOrganizers = []
  var electionIds = []
  var final = []
  electionName.find({}).then(eachOne => {
      for (i = 0; i < eachOne.length; i++){
          electionNames[i] = eachOne[i].election_name ;
          electionOrganizers[i] = eachOne[i].election_organizer;
          electionIds[i] = eachOne[i].election_id;
          final.push({
              'election_id': eachOne[i].election_id,
              'election_organizer': eachOne[i].election_organizer,
              'election_name': eachOne[i].election_name
          })
      }
      res.send(final);
  })
})

app.post('/api/electionName', async function(req, res) {
  electionName.create({
      election_id: Math.floor(Math.random() * 100),
      election_name: req.body.election_name,
      election_organizer: req.body.election_organizer,
      election_password: md5(req.body.election_password),
  }).then(election => {
      res.json(election);
  });
});

app.post('/api/login', async function(req, res) {
  users.findOne({
      username: req.body.username,
      password: req.body.password,
  }).then(election => {
      if(election === null){
          res.send(false);
      }else{
          res.send(true);
      }
  });
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
