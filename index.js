var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

// Initialize multer. We don't need to save the file, just process it in memory.
var upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// The API endpoint for file analysis.
// 'upload.single('upfile')' is the multer middleware that handles the file upload.
// It looks for a file in a form field named 'upfile'.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // multer adds a 'file' object to the request object (req).
  // This object contains metadata about the uploaded file.
  if (!req.file) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }

  // Respond with the required JSON structure
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
