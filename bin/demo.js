const express = require('express');
const path = require('path');

const app = express();

app.use('/insomnia-documenter', express.static(path.resolve(__dirname, '..', 'docs')));
app.get('/', function (req, res) {
  return res.redirect('/insomnia-documenter');
});
app.listen(5000, function () {
  console.log('App listening on http://localhost:5000');
});
