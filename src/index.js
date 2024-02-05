const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("public"));

app.set('view engine', 'ejs');

// Define routes for the API
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            res.status(400).json({ message: "Username already exists. Please try another." });
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;

            const userData = await collection.insertMany(data);
            res.status(201).json(userData);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

            if (isPasswordMatch) {
                res.status(200).json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Wrong Password" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
