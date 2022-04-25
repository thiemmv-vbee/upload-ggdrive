require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const {uploadFile} = require('./services/gg-drive');

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api', (req, res) => {
    return res.send({message: 'ok'});
});

app.post('/api/upload', async (req, res) => {
    let file = req.files.doc;

    file.mv(`./public/uploads/${file.name}`);

    await uploadFile(file.name, file.mimetype);

    return res.send({message: "ok"});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is runing on port ${process.env.PORT}!`);
})