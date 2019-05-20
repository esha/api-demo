var express = require('express');
//var logfmt = require('logfmt');
//var bodyParser = require('body-parser');
var cors = require('cors');;
var request = require('request');
var app = express();
const port = process.env.HNOSS_PORT || process.env.PORT || 8888;
const dir = process.env.HNOSS_DIR || 'dist';
let api = process.env.HNOSS_API || "https://api.eshacloud.com:30261";
var apiUsername = process.env.HNOSS_API_USERNAME;
var apiPassword = process.env.HNOSS_API_PASSWORD;
var apiOptions = {};

if (apiUsername && apiPassword) {
    apiOptions.auth = {
        user: apiUsername,
        pass: apiPassword
    };
}

function toURL(req) {
    return req.originalUrl.replace('/api/', api);
}

function log(req) {
    const url = toURL(req);
    if (req.method === 'OPTIONS') {
        return { method: req.method, url };
    }
    return {
        method: req.method,
        url,
        headers: req.headers,
        body: typeof req.body === "string" ? req.body : JSON.stringify(req.body)
    };
}
function print(log) {
    console.log(log.method, log.url);
    if (log.headers) {
        for (const key in log.headers) {
            if (!log.headerFilter || log.headerFilter.contains(key)) {
                console.log(key, ': ', log.headers[key]);
            }
        }
    }
    if (log.body) {
        console.log(typeof log.body === "string" ? log.body : JSON.stringify(log.body));
    }
    console.log('\n');
}

app.use(cors());
//app.use(bodyParser.text({ type: ['text/*', 'application/soap+xml'] }));
//app.use(bodyParser.json());
//app.use(logfmt.requestLogger({immediate: true}, log));

app.all('/api/*', function (req, res) {
    const url = toURL(req);
    const method = req.method.toLowerCase();

    print(log(req))
    try {
        req.pipe(request[method](url, apiOptions))
            .pipe(res);
    } catch (e) {
        res.status(500).send(e.toString()).end();
    }
})

app.use(express.static(dir));

app.listen(port, function () {
    console.log('Using API:', api, 'on port', port);
});
