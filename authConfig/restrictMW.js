const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log('restrict')
                res.status(401).json({ message: '401: Unauthorized' })
            } else {
                if (decodedToken.active) {
                    req.user = decodedToken
                    next();
                } else {
                    res.status(401).json({ message: '401: Unauthorized, this account is inactive. Please contact an administrator.' })
                }
            }
        })
    } else {
        res.status(401).json({ message: '401: Unauthorized' })
    }
};
