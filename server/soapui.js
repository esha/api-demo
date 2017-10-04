var express = require('express');
var logfmt = require('logfmt');
var cors = require('cors');
var request = require('request');
var app = express();
var api = process.env.API || 'http://localhost:8088';

function toApi(url, staging) {
    url = url.replace('/api', api);
    console.log('Proxy for: '+url);
    return url;
}

console.log('Using API:', api);

app.use(logfmt.requestLogger());

app.options('/api/*', cors());
app.get('/api/*', cors(), function(req, res) {
    request(toApi(req.originalUrl)).pipe(res);
});
app.post('/api/*', cors(), function(req, res) {
    req.pipe(request.post(toApi(req.originalUrl))).pipe(res);
});

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 3000);
