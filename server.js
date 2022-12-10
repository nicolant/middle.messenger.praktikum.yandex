const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

const pathToStaticFolder = path.join(__dirname, 'dist');
app.use(express.static(pathToStaticFolder));

app.listen(PORT, () => console.log(`Express server is listening on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(pathToStaticFolder+'/index.html');
})
