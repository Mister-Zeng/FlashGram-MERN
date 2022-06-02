const User = require('../models/user-model');
import generateToken from "../utils/generate-token.js";



const registerUser = async (req, res) => {
    const { password, fullname, email, username } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error("User already exist")
    }

    const user = new User({
      username,
      password,
      email,
      fullname
    })
    await user.save();
    req.session.user_id=user._id;
    res.redirect('/')
}











export const getUsers = (req, res, next) => {
    res.json({ users: usersList });
};

export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if  (!errors.isEmptu()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    };
    const { name, username, email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later', 500);
        return next(error);
    };

    if (existingUser) {
        const error = new HttpError('User exist already, please login instead', 422);
        return next(error);
    }

    const createUser = new User({
        username,
        name,
        email,
        password
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser });
};

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Login failed, please try again later', 500);
        return next(error);
    };



    res.json({ message: 'Logged in successfully' })
};
