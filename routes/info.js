const os = require("os");

module.exports = ({ version, environment }) => {

    const router = require("express").Router();

    router.get("/", (req, res) => {

        res.json({

            application: "DevOps Demo",

            version,

            environment,

            hostname: os.hostname(),

            node: process.version,

            uptime: Math.floor(process.uptime()),

            platform: process.platform,

            architecture: process.arch,

            cpus: os.cpus().length,

            totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),

            freeMemoryMB: Math.round(os.freemem() / 1024 / 1024)

        });

    });

    return router;

};
