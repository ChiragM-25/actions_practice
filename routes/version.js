module.exports = ({
    version,
    environment,
    commit,
    branch,
    workflowRun,
    buildTime
}) => {

    const router = require("express").Router();

    router.get("/", (req, res) => {

        res.json({

            application: "DevOps Demo",

            version,

            environment,

            commit,

            branch,

            workflowRun,

            buildTime

        });

    });

    return router;

};
