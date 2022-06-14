import User from '../models/user-model.js';
import bcrypt from 'bcrypt';

export const getAllUser = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" })
    }
    res.status(200).json({ users });
};

export const signup = async (req, res) => {
    const { name, username, email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error);
    };


    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists. Login Instead" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        name,
        email,
        password: hashedPassword,
        posts: []
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    res.status(201).json({ user });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username })
    } catch (error) {
        console.log(error)
    };

    if (!existingUser) {
        return res.status(404).json({ message: "Couldnt Find User By This Email" })
    }

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    res.status(200).json({ message: "Successfully signed in.", user: existingUser });
};