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

app.route('/articles')
    .get( function(req, res) {
        Article.find( function(err, articles){
            if (!err) {
                res.send(articles);
            } else {
                res.send(err);
            }
        });
    })
    .post( function(req,res) {
        const titleInput = req.body.title;
        const contentInput = req.body.content;
        console.log(titleInput, contentInput);
        const newArticle = new Article({title: titleInput, content: contentInput});
        newArticle.save(function(err) {
            if ( !err ) {
                res.send('Successfully added a new article');
            } else {
                res.send(err);
            }
        });
    })
    .delete(function(req,res) {
        Article.deleteMany(function(err) {
            if (!err) {
                res.send('Successfully deleted all articles');
            } else {
                res.send(err);
            }
        })
    });

app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
})