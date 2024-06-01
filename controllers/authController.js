// authController.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Secret_key';


exports.login = (req, res) => {
  // Aquí deberías implementar la lógica de autenticación
  const username = req.body.username
  const password = req.body.password
  if (username == 'admin' && password == '12345') {
    const token = jwt.sign({ username: username }, SECRET_KEY);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }



};

/*
// authController.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Secret_key';

exports.login = (req, res) => {
  // Aquí deberías implementar la lógica de autenticación
  const username = req.body.username;
  const password = req.body.password;

  if (username == 'admin' && password == '12345') {
    try {
      const token = jwt.sign({ username: username }, SECRET_KEY);
      res.json({ token: token });
    } catch (error) {
      console.error('Error generando el token:', error);
      res.status(500).json({ message: 'Error generando el token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

*/