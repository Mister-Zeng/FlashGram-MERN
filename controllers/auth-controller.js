import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';

export const retrieveToken = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
}

export const verifyToken = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
}