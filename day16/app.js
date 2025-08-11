const express = require('express');
const app = express();
const port = 3000;

const date = new Date()

app.use((req, res, next) => {
  res.send('Hello! its ' + date)
  console.log(` ${date} ${req.method} ${req.path}`)

  next()
});
app.use((err, req, res, next) => {
  console.error(err.stack); // logs the full error
  res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});