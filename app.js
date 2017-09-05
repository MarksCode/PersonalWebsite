const express = require('express');
const { createEngine } = require('express-react-views');

const app = express();
const port = 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

app.get('/', (req, res, next) => {
  res.render('index.jsx', { name: 'world' });
});

app.listen(
  port,
  () => console.log(`\uD83C\uDF0F running at http://localhost:${port}`)
);