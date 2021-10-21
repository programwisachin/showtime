//todo Importing Modules

const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "sachinisActively$!Coding";

// todo Endpoints :-

// todo Endpoint 1:- To create a new user

router.post("/user",
    [
        //!Validation of credentials provided by the user
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be of atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        let success = false
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                res.status(400).json({
                    success,
                    error: "Sorry a user with this email already exists !"
                })
            }
            // todo Generating salt to encrypt password
            const salt = await bcrypt.genSalt(10)
            const seccuredPassword = await bcrypt.hash(req.body.password, salt)  //Hashing password with salt

            user = await User.create({
                name: req.body.name,
                "email": req.body.email,
                "password": seccuredPassword
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)  //generating a authtoken
            success = true
            res.status(200).json({ success, authToken })


        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
    })


// todo Endpoint 2:- To login existing user 

router.post("/login",
    [
        //!Validation of credentials provided by the user
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be of atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        let success = false
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.password

        try {
            let user = await User.findOne({ email })
            if (user) {
                res.status(400).json({
                    success,
                    error: "Sorry a user with this email already exists !"
                })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)   //Comparing user password and password stored in the database
            if (!passwordCompare) {
                res.status(400).json({
                    success,
                    error: "Please enter correct credentials !"
                })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)  //generating a authtoken
            success = true
            res.status(200).json({ success, authToken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
    })

module.exports = router