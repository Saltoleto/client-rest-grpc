import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


export default (req, res, next) => {
    const token = req.get('Authorization')
    if (!token) {
        res.status(403)
        return res.send('Token is required')
    }

    jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(403)
            return res.send()
        }
        req.body = {...req.body, tenantId: decoded.UserId}
        next()
    })
}
