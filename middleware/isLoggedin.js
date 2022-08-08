const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  console.log('Checking login');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;    
    res.sendStatus(403); 
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    next();
  }
  
};

module.exports = checkAuth;