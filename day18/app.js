const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use ((req,res,next) => {
    res.status(404).send({error:"404 page not found"});
    })
app.get('/example', (req, res) => {
  console.log('Handling the /example route');
  res.send('Hello, this is the response!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});