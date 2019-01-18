'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
var upload = multer().single('upfile')

var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(multer({ dest: 'uploads/' }).single('upfile'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.post('/api/fileanalyse', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading");
    } else if (err) {
      console.log("An unknown error occurred when uploading");
    }
  })
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
