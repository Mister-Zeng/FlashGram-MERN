import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ message: "No Users Found" })
        }
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }

};

export const signup = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Login instead" })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, name, email, password: hashedPassword, posts: [] });

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    };
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "Couldnt Find User By This Email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Successfully signed in.", user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    };
};