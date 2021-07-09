const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const PORT = 3000;

const MONGO_URL = 'mongodb://localhost:27017';

const DB_NAME = 'wikiDB';

mongoose.connect(`${MONGO_URL}/${DB_NAME}`,
 { useNewUrlParser: true, useUnifiedTopology: true});

const articlesSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articlesSchema);

app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
})