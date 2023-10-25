// Create web server

// Import Express
const express = require('express');
const app = express();

// Import Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Cors
const cors = require('cors');
app.use(cors());

// Import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create Schema
const commentSchema = new Schema({
    name: String,
    comment: String
});

// Create Model
const Comment = mongoose.model('Comment', commentSchema);

// Create Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.json(comments);
    });
}
);

app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        res.json(comment);
    });
}
);

app.listen(3000, () => {
    console.log('Listening on port 3000');
}
);

// Run Server
// node comments.js
// Open Browser

