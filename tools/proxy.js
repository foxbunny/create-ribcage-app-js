var httpProxy = require('http-proxy');
var HTTPServer = require('http-server').HTTPServer;
var util = require('util');

baseDir = 'www';

SERVICE_ENABLED = false; // Whether to use the backend server or not

// Target configuration for backend server
SERVICE = {
  target: {
    host: 'localhost', // set to proper hostname
    port: 3000, // port 443 for HTTPS if you want
    https: false, // true for HTTPS
    rejectUnauthorized: false, // true to only use valid SSL certs
  },
  rootPath: '/backend', // Access backend server at this URL
  baseUrl: '/' // the rootPath is an alias for this path on the backend
};

// Target configuration for local static server (do not change this)
static = {
  target: {
    host: 'localhost',
    port: 8081
  }
};

EMO_SHINE = "(^o^)/";
EMO_SAD = "(;.;)~";
EMO_EMBARRASED = "(-.-')";

// Static server at 8081 servinf from the www directory
httpServer = new HTTPServer({root: baseDir});
httpServer.listen(8081);

console.log(EMO_SHINE + ' localhost:8081 from \'' + baseDir + '\'');

// Log uncaught errors
process.on('uncaughtException', function(err) {
  console.log(EMO_EMBARRASED + ' ~{ ' + err + ' }');
});

proxyPathRe = new RegExp('^' + SERVICE.rootPath);

// Create proxy server with URL rewriting
proxyServer = httpProxy.createServer(function(req, res, proxy) {
  var backend;

  console.log(req.method + ':' + req.url);

  if (SERVICE_ENABLED && req.url.match(proxyPathRe)) {
    // If it's a request going for service:
    req.url = req.url.replace(SERVICE.rootPath, SERVICE.baseUrl);
    backend = SERVICE;
  } else {
    // For all other requests go to internal static server:
    backend = static;
  }

  console.log(EMO_SHINE + ' ' + backend.target.host + ':' + 
    backend.target.port + req.url);
  proxy.proxyRequest(req, res, backend);
});

proxyServer.listen(8080, '0.0.0.0');

proxyServer.proxy.on('proxyError', function(err) {
  var msg;

  switch (err.code) {
    case ('ETIMEDOUT'):
      msg = 'Connection to target timed out';
      break;
    case ('ECONNRESET'):
      msg = 'Client connection was reset';
      break;
    default:
      msg = 'Unknown connection error ' + err.code;
  }
  console.log(EMO_EMBARRASED + ' ~{ ' + msg + ' }');
});

// Enjoy!
console.log(EMO_SHINE + ' localhost:8000');
if (SERVICE_ENABLED) {
  console.log(EMO_SHINE + ' localhost:8080' + SERVICE.rootPath + ' ~~> ' + 
    SERVICE.target.host + ':' + SERVICE.target.port + SERVICE.baseUrl);
}
console.log('Press Ctrl-C twice to stop.');
