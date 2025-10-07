const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  req.session.user = {
    name: name,
    loginTime: new Date().toISOString()
  };
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const { name, loginTime } = req.session.user;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Profile</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .profile-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          width: 350px;
          text-align: center;
        }
        h1 {
          color: #333;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          color: #555;
        }
        a {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.7rem 1.5rem;
          background-color: #dc3545;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        a:hover {
          background-color: #a71d2a;
        }
      </style>
    </head>
    <body>
      <div class="profile-container">
        <h1>Profile</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Login Time:</strong> ${loginTime}</p>
        <a href="/logout">Logout</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/login');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
