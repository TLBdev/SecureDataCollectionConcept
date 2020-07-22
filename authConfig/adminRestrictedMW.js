const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: '401: Unauthorized' })
            } else {
                if (decodedToken.username === 'admin') {
                    req.user = decodedToken
                    next();
                } else {
                    res.status(401).json({ message: '401: Unauthorized' })
                }
            }
        })
    } else {
        res.status(401).json({ message: '401: Unauthorized' })
    }
};
