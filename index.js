if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    
}

const express = require('express');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const Database = require('nedb');
const { response } = require('express');

const imgURL = "https://flashgroupnews.com/wp-json/wp/v2/media/";
const NEWS_URL = "https://flashgroupnews.com/wp-json/wp/v2/posts?";
const coinsURL = "https://ticker-api.cointelegraph.com/rates/?full=true";

initializePassport(passport);

const app = express();

app.listen(3000, () => console.log('listining...'));
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));
// app.use('view-engine', 'ejs');
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({
    limit: '1mb'
}));

app.get('/admin', checkUser, (req, res) => {
    return res.render('admin.ejs');
});

app.get('/dashboard', checkAuth, (req, res) => {
    return res.render('dashboard.ejs');
});

app.post('/auth', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failurRedirect: '/admin',
    failureFlash: true
}));

// API Endpoints
app.get('/news', (req, res) => {
    res('lol');
});

const database = new Database('posts.db');
database.loadDatabase();

app.post('/addPost', (req, res) => {
    
    const id = req.body.id
    const category = req.body.category;
    console.log('id is :'+req.body.id);
    let canaddnum=0;
    

    if(category=='blockchain_news' || category=='news_news'){
        database.remove({ category: category}, { multi: true }, function (err, numRemoved) {});
    }else if(category=='defi_news'){
        canaddnum=2;
    }else if(category=='business_news'){
        canaddnum=3;
    }
 
 
    database.find({
        id: id , category: category
    }, (err, docs) => {
        if(err){
            res.status(500).send();
        }
        database.find({
           category: category
        }, (err, docsy) => {
            if(err){
                res.status(500).send();
            }
            if(canaddnum==2){
                if(docsy.length>=2){
                    console.log('post limit reached in the database');
                    res.status(305).send();
                }else{
                    if (docs.length == 0) {
                        database.insert(req.body);
                        console.log('post added to the database');
                        res.status(200).send();
                    }else{
                        console.log('post already exists in the database');
                        res.status(304).send();
                    }
                }
            }
            else if(canaddnum==3){
                if(docsy.length>=3){
                    console.log('post limit reached in the database');
                    res.status(305).send();
                }else{
                    if (docs.length == 0) {
                        database.insert(req.body);
                        console.log('post added to the database');
                        res.status(200).send();
                    }else{
                        console.log('post already exists in the database');
                        res.status(304).send();
                    }
                } 
            }
            else{
                if (docs.length == 0) {
                    database.insert(req.body);
                    console.log('post added to the database');
                    res.status(200).send();
                }else{
                    console.log('post already exists in the database');
                    res.status(304).send();
                }
            }
        });
        
    });

});

app.get('/getPosts', (req, res) => {
    console.log('getting posts on category: '+req.query.category+'...');
    
    database.find({category: req.query.category}, (err, docs) => {
        res.json(docs);
    });
});

app.post('/removePost', (req, res) => {
  
    const id = req.body.id;
    const category = req.body.category;
    console.log('remove category is :'+category);
    console.log('remove id is :'+id);
    
    database.remove({ id: id , category: category}, {}, function (err, numRemoved) {
        // numRemoved = 1
      });
});

// auth
function checkUser(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');
}