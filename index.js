import express  from "express";
import cors  from "cors";
import {loadBackend}  from "./src/back/index.js";
import {handler}  from "./src/front/build/handler.js";


var app = express();
app.use(express.json());
app.use(cors());

var port = process.env.PORT || 12345;

loadBackend(app);
app.use(handler);

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
});




