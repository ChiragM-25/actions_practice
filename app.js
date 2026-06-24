const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Version 4 deployed via GitHub Actions + ECR!!!');
});

app.listen(3000, () => {
    console.log('App running on port 3000');
});
