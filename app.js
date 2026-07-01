const express = require("express");
const os = require("os");

const healthRoute = require("./routes/health");
const versionRoute = require("./routes/version");
const infoRoute = require("./routes/info");

const app = express();

const PORT = process.env.PORT || 3000;

const APP_ENV = process.env.APP_ENV || "development";
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

const GIT_COMMIT = process.env.GIT_COMMIT || "local";
const GIT_BRANCH = process.env.GIT_BRANCH || "local";
const BUILD_TIME = process.env.BUILD_TIME || "local";
const WORKFLOW_RUN = process.env.WORKFLOW_RUN || "local";

const startTime = Date.now();

app.use(express.static("public"));

app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );
    next();
});

app.use(
    "/health",
    healthRoute({
        startTime
    })
);

app.use(
    "/version",
    versionRoute({
        version: APP_VERSION,
        environment: APP_ENV,
        commit: GIT_COMMIT,
        branch: GIT_BRANCH,
        workflowRun: WORKFLOW_RUN,
        buildTime: BUILD_TIME
    })
);

app.use(
    "/info",
    infoRoute({
        version: APP_VERSION,
        environment: APP_ENV,
        startTime
    })
);

app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>

<html>

<head>

<title>DevOps Demo</title>

<link rel="stylesheet" href="/style.css">

</head>

<body>

<div class="card">

<h1>🚀 DevOps Application Deployed on EKS from GitHub-Actions</h1>

<table>

<tr><td>Environment</td><td>${APP_ENV}</td></tr>

<tr><td>Version</td><td>${APP_VERSION}</td></tr>

<tr><td>Hostname</td><td>${os.hostname()}</td></tr>

<tr><td>Node.js</td><td>${process.version}</td></tr>

<tr><td>Platform</td><td>${process.platform}</td></tr>

<tr><td>Architecture</td><td>${process.arch}</td></tr>

<tr><td>Uptime</td><td>${Math.floor(process.uptime())} sec</td></tr>

</table>

<hr>

<h3>Available APIs</h3>

<ul>

<li><a href="/health">/health</a></li>

<li><a href="/version">/version</a></li>

<li><a href="/info">/info</a></li>

</ul>

</div>

</body>

</html>
`);
});

app.listen(PORT, () => {
    console.log(`Application Started`);
    console.log(`Listening on port ${PORT}`);
    console.log(`Environment : ${APP_ENV}`);
    console.log(`Version : ${APP_VERSION}`);
});

process.on("SIGTERM", () => {

    console.log("SIGTERM received.");

    console.log("Shutting down gracefully...");

    process.exit(0);
});

process.on("SIGINT", () => {

    console.log("Interrupted.");

    process.exit(0);
});
