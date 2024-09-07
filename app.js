const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 13500;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling user sessions
app.use(session({
    secret: 'csonoaa_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // For now, we'll just have a simple login with hardcoded credentials
    if (email === 'user@example.com' && password === 'password') {
        req.session.user = { name: 'Csonoaa User', email };
        return res.redirect('/');
    } else {
        return res.send('Invalid credentials');
    }
});

// Signup route
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Normally, you'd store user details in a database
    req.session.user = { name, email }; // Store the user in session
    res.redirect('/');
});

// Guest route
app.get('/guest', (req, res) => {
    req.session.user = { name: 'Guest' }; // Set user as Guest in session
    res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
