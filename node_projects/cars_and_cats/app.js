// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/stylesheets/cars'){
        fs.readFile('./stylesheets/cars.css', 'utf8', function(errors, contents){
             response.writeHead(200, {'Content-type': 'text/css'});
             response.write(contents);
             response.end();
        });
    }
    else if(request.url === '/images/cooltruck1'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/cooltruck1.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/images/cooltruck2'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/cooltruck2.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/images/cooltruck3'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/cooltruck3.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/cats') {
        fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/stylesheets/cats'){
        fs.readFile('./stylesheets/cats.css', 'utf8', function(errors, contents){
             response.writeHead(200, {'Content-type': 'text/css'});
             response.write(contents);
             response.end();
        });
    }
    else if(request.url === '/images/coolcat1'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/coolcat1.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/images/coolcat2'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/coolcat2.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/images/coolcat3'){
    // notice we won't include the utf8 encoding
    fs.readFile('./images/coolcat3.jpeg', function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/jpg'});
        response.write(contents);
        response.end();
        });
    }
    else if(request.url === '/cars/new') {
        fs.readFile('./views/new.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/stylesheets/new'){
        fs.readFile('./stylesheets/new.css', 'utf8', function(errors, contents){
             response.writeHead(200, {'Content-type': 'text/css'});
             response.write(contents);
             response.end();
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('URL requested is not available.');
    }
});
// tell your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");
