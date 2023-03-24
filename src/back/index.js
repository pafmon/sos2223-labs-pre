import cool from "cool-ascii-faces";

var contacts = [{name:"pablo",phone:"12345"},{name:"peter",phone:"56789"}];

function loadBackend(app){
    app.get("/api/v1/faces", (request,response) => {
        response.send(cool());
        console.log("New GET /api/v1/faces request");
    });
    
    app.get("/api/v1/contacts", (request,response) => {
        response.json(contacts);
        console.log("New GET /api/v1/contacts request");
    });

    app.get("/api/v1/contacts/:name", (request,response) => {
        var foundContacts = contacts.filter((c)=>(c.name == request.params.name));
        if(foundContacts.length >=1)
            response.json(foundContacts[0]);
        else   
            response.sendStatus(404);
        console.log(`New GET /api/v1/contacts/${request.params.name} request`);
    });

    app.delete("/api/v1/contacts/:name", (request,response) => {
        var filteredContacts = contacts.filter((c)=>(c.name != request.params.name));
        if(contacts.length >= filteredContacts.length){
            contacts = filteredContacts;
            response.sendStatus(200);
        }else   
            response.sendStatus(404);
        console.log(`New DELETE /api/v1/contacts/${request.params.name} request`);
    });

    app.post("/api/v1/contacts", (request,response) => {
        console.log("New POST /api/v1/contacts request with body:");
        console.log(JSON.stringify(request.body));
        contacts.push(request.body);
        response.sendStatus(201);
    });
    
    app.get("/api/v1/version", (request,response) => {
        response.json({version: process.env.npm_package_version });
        console.log("New /api/v1/version request");
    });
}


export { loadBackend };



