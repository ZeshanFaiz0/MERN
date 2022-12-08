import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        var {
            firstName,
            lastName,
            email,
            password,
            picture,
            picturePath,
            friends,
            location,
            occupation
        } = req?.body;
        if(!picturePath){
            picturePath = (process.env.PIC_PATH ) + picture
        }
        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: passHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser =  await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}