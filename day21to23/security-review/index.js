const jwt = require('jsonwebtoken')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt')
const { body, validationResult } = require(`express-validator`);
const session = require('express-session');
const { SanitizersImpl } = require('express-validator/lib/chain');


const users = [
  { username: 'admin', password: '12345678' }
]

// Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack)
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: {
      message: err.message || 'internal server error'
    }
  })
})
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
  })
);
const JWT_secret = 'very wery secret'
// Routes
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the Sample Vulnerable Node.js Application</h1>`);
});
app.get('/register', (req, res) => {
  res.send(`
    <h1>register</h1>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">register</button>
    </form>
  `);
});


app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});
app.post('/register', [
  body('username').trim().escape()
    .notEmpty().withMessage('username is required')
    .isAlpha().withMessage('username can only be composed of Letters')
    .isLength({ min: 3, max: 15 }).withMessage('username can only be 3 to 15 characters long'),
  body('password').trim().escape()
    .notEmpty().withMessage('password is required')
    .isLength({ min: 8, max: 15 }).withMessage('password can only be 8 to 15 characters long')
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
      const { username, password } = req.body
    }
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      username: username,
      password: hashedPassword
    }
    users.push(user)
    const token = jwt.sign(
      { username: username },
      JWT_secret,
      { expiresIn: '1h' }
    );
    res.redirect('/login');
  } catch (err) {
    next(err)
  }
})

app.post('/login', [
  body('username').trim().escape()
    .notEmpty().withMessage('username is required')
    .isAlpha().withMessage('username can only be composed of Letters')
    .isLength({ min: 3, max: 15 }).withMessage('username can only be 3 to 15 characters long'),
  body('password').trim()
    .notEmpty().withMessage('password is required')
    .isLength({ min: 8, max: 15 }).withMessage('password can only be 8 to 15 characters long')
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body;
    const userIndex = users.findIndex(u => u.username === username)
    if (userIndex === -1) { return res.json({ message: 'user not found' }) }
    const isMatch = await bcrypt.compare(password, users[userIndex].password)
    if (isMatch) {
      req.session.authenticated = true;
      req.session.username = username;
      const token = jwt.sign(
        { username: username },
        JWT_secret,
        { expiresIn: '1h' }
      );
      req.session.userId = username
      res.redirect('/profile');
    } else {
      res.status(400).send('Invalid username or password');
    }

  }
  catch (err) {
    next(err)
  }
});

app.get('/profile', (req, res) => {
  if (req.session.authenticated) {
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>
    <form action="/logout" method="POST">
    <button type="submit">LogOut</button>
    </form>`);
  } else {
    res.redirect('/login');
  }
});
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid")
    res.send("logged out successfully")
  })
})
// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
