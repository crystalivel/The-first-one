const http = require('http');
const url = require('url');
const theWeatherApp = require('./weatherapp.js')

const server = http.createServer(async(req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('I am a list of users :)');
    } else if (path === '/weatherApp') {
        const city = query.city;
        const weatherApp = theWeatherApp(city)
        if (!city){
            res.writeHead(400,{"content-type":"text/plain"})
            return res.end(`please provide a city name`)
        }
    try{
        const result = await theWeatherApp(city)
       res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify(result))
    }
    catch(err){
        console.error(`weather error`,err)  
       res.writeHead(500,{"content-type": 'text/plain'})
        res.end('error fetching weather')
}
        } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server once
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
