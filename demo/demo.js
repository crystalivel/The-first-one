const { createServer } = require('node:http');

const port = 4000
// eg: teamWorkMakesTheDreamWork
// team_work_makes_The_
// team-work-makes-the-
// TeamWorkMakesTheDreamWork


const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const url = req.url
    const product = [
        'tomatos', 'apple', 'carrots'
    ]
    if (url === '/products') {
        res.write(JSON.stringify(product));
        res.end();
    }
});





server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});