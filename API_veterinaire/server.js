import express from "express";
import {default as versioning} from "express-routes-versioning";
const routesVersioning = versioning();
import { default as Router } from "./route/index.js";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174','http://localhost:8081'],
    methods: ['GET', 'POST',' PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
};

app.use(cors(corsOptions));

//---Versionning-----------------------------------
app.use(function(req, res, next) {
    req.version = req.get('accept-version');
    next();
});

app.use('/api',
    routesVersioning({  
        "1.0.0": respondV1
    })
 );

function respondV1(req, res, next) {
    app.use('/api', Router);
    next();
};

//----------------------------------------------

app.use(Router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});