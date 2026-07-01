const os = require("os");

module.exports = ({ startTime }) => {

    const router = require("express").Router();

    router.get("/", (req, res) => {

        res.json({

            status: "UP",

            timestamp: new Date().toISOString(),

            uptime: Math.floor(process.uptime()),

            hostname: os.hostname(),

            memory: process.memoryUsage(),

            platform: process.platform

        });

    });

    return router;

};
