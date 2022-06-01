const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const User = require('../models/user');


export const usersList = [
    {
        id: uuid(),
        username: "",
        name: "",
        email: "",
        password: ""
    }
];

export const getUsers = (req, res, next) => {
    res.json({ users: usersList });
};

export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmptu()) {
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
