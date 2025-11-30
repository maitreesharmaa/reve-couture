const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const cors = require('cors');

function applySecurity(app){
    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
        optionsSuccessStatus: 200
    }));
    app.use(
        rateLimit({
            windowsMs: 15*60*1000,
            max: 1000,
            standardHeaders: true,
            legacyHeaders: false
        })
    )
}

module.exports = {applySecurity};
