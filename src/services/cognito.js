const express = require('express');
const router = express.Router();
require('dotenv').config();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } = AmazonCognitoIdentity;

// Configure Amazon Cognito
const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

router.get('/', (req, res) => {
  res.send('Test users!');
});

router.post('/register', (req, res) => {
  const { username, password, rol } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const attributeList = [
    new CognitoUserAttribute({
      Name: 'nickname',
      Value: username,
    }),
    new CognitoUserAttribute({
      Name: 'custom:rol',
      Value: rol,
    }),
  ];

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'User registered successfully', result });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session) => {
      console.log('Authentication successful');
      res.json({ message: 'Login successful', session });
    },
    onFailure: (err) => {
      console.error('Login error:', err);
      const statusCode = err.message === "User is not confirmed." ? 350 : 400;
      res.status(statusCode).json({ error: err.message });
    },
  });
});

module.exports = router;
