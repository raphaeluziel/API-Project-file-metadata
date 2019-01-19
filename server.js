'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
// upfile is the name of the input field 
var upload = multer().single('upfile')

var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(multer({ dest: 'uploads/' }).single('upfile'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.post('/api/fileanalyse', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading");
    } else if (err) {
      console.log("An unknown error occurred when uploading");
    }
  })
  // If no file was chosen, redirect to the homepage
  if (!req.file) {
    res.redirect('/')
  }
  // Otherwise return the file metadata information
  else{
    res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
  }
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
