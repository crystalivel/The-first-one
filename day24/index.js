const express = require('express')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const cookieParser = require('cookie-parser')


const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
    session({
        secret: 'supersecretcode',
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.initialize())
app.use(passport.session())

const users = []
passport.use(new localStrategy(
    { usernameField: "username", passwordField: 'password' }, 
    async (username, password, done) => {
        const foundUser = users.find(u => u.username === username)
        if (!foundUser) return done(null, false, { message: "User not found" })

        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return done(null, false, { message: "Invalid password" })

        return done(null, foundUser)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.username)
})
passport.deserializeUser((username, done) => {
    const foundUser = users.find(u => u.username === username)
    done(null, foundUser)
})

function Auth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.status(401).send("Login is required!")
}

//home page 
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Welcome to the Home page ${req.user.username}</h1>
                    <a href='/profile'>Profile</a><br>
                    <a href='/logout'>Logout</a`)
    } else {
        res.send(`<h1>Home</h1>
                <a href='/register'>Register</a><br>
                <a href='/login'>Login</a>`);
    }
})

//register
app.get("/register", (req, res) => {
    res.send(`<form method='POST' action='/register'>
            <input name='username' placeholder='username' required />
            <input type='password' name='password' placeholder='Password'required />
            <button type='submit'>Register</button></form>`)
})
app.post("/register", [
    body('username').trim().escape()
        .notEmpty().withMessage('username is required')
        .isAlpha().withMessage('username can only be composed of Letters')
        .isLength({ min: 3, max: 15 }).withMessage('username can only be 3 to 15 characters long'),
    body('password').trim()
        .notEmpty().withMessage('password is required')
        .isLength({ min: 8, max: 15 }).withMessage('password can only be 8 to 15 characters long')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({
        username: username, password: hashedPassword
    })
    req.logIn({ username, password }, (err) => {
        if (err) return res.status(500).send("Error logging in after register")
        return res.redirect("/profile")
    })
})
// login
app.get("/login", (req, res) => {
    res.send(`<form method='POST' action='/login'>
            <input name='username' placeholder='Username' required />
            <input type='password' name='password' placeholder='Password'required />
            <button type='submit'>Login</button></form>
            `)
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "login",
}))
// profile 
app.get("/profile", Auth, (req, res) => {
    res.send(`<h1>Profile Page</h1>
    <p>Welcome, ${req.user.username}</p>
    <a href='/logout'>Logout</a>`);
})
app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.clearCookie("connect.sid"); // Clear session cookie
        res.redirect("/");
    });
});

app.listen(port, () => console.log(`erver running on http://localhost:${port}`))