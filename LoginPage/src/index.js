const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'Logindata'; // Database Name
const collectionName = 'collection'; // Collection Name from environment variables

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get("/", (req, res) => {
    res.render("home"); 
});

app.get('/whatiscybersecurity', (req, res) => {
    res.render('whatiscybersecurity');
});

app.get('/vapt', (req, res) => {
    res.render('vapt');
});

app.get('/dfir', (req, res) => {
    res.render('dfir');
});

app.get('/linux', (req, res) => {
    res.render('linux');
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login"); // Add a route for login page
});

app.get("*", (req, res) => {
    res.render("404");
});

// Signup POST Route
app.post("/signup", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const data = {
            username: req.body.username,
            password: req.body.password // Store the password as is
        };

        await collection.insertOne(data);
        res.render("home");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
});

// Login POST Route
app.post("/login", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const { username, password } = req.body;

        // Find user by username and password
        const user = await collection.findOne({ username, password });

        if (user) {
            res.render("home"); // Render the home page
        } else {
            res.render("login", { error: "Invalid username or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
});

// Server listening
app.listen(4331, () => {
    console.log("The server is running at port 4331");
});
