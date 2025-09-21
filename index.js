const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up multer for file uploads. 
// 'dest: 'uploads/'' would save files to an 'uploads' folder.
// For this project, we only need the file data in memory, so we don't specify a destination.
const upload = multer();

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// API endpoint for file analysis
// The 'upload.single('upfile')' middleware will process a single file upload
// from the form field named 'upfile'.
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // req.file is an object that contains metadata about the uploaded file.
  // It's populated by the multer middleware.
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with the required file metadata in a JSON object
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

