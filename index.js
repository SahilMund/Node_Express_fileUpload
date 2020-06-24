const express = require('express');
const uploading = require('express-fileupload');

const app = express();

//middleware for file-uploader
app.use(uploading());


app.get('/upload', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/upload', function(req, res) {
    if (req.files) {
        //console.log(req.files); // the uploaded file object
        const uploadedFile = req.files.file;
        const fileName = req.files.file.name;
        console.log(fileName + "  file uploaded succesfully");

        uploadedFile.mv('./uploads/' + fileName, (err) => {
            if (err) { res.send(err) }
            res.send(`Sucessfully saved to uploads `)
        })
    } else {
        return res.status(400).send('You have not enter any file !!');


    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {

    console.log(`Server running on ${port}.....`);


});