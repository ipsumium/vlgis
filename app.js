const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res) {
    res.sendFile('./web/index.html', { root: __dirname });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});