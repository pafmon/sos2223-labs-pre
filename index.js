var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/faces", (request,response) => {
    response.send(cool());
    console.log("New /faces request");
});

app.get("/resource", (request,response) => {
    response.json({id:"myId"});
    console.log("New /resource request");
});

app.get("/version", (request,response) => {
    response.json({version:"1.0"});
    console.log("New /version request");
});

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
});




