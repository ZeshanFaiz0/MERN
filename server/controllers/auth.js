import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js"
import { computeHash } from "../utils/cryptoUtils.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        var { firstName, lastName, email, password, picturePath, friends, location, occupation } = req?.body;
        if (!picturePath) {
            picturePath = (process.env.PIC_PATH);
        }

        var passHash = await computeHash(email, password);

        const newUser = new User({
            firstName, lastName, email, password: passHash, picturePath, friends, location, occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        var { email, password } = req?.body;
        var user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(email.toUpperCase() + password, user.password)) {
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                user.password = "";
                res.status(200).json({ token, user });
            }
            else { res.status(400).json({ message: "Incorrect Password" }) }
        }
        else {res.status(400).json({ message: "Incorrect Email " })}
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}