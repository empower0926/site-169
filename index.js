if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

}

const express = require('express');
const passport = require('passport');
const initializePassport = require('./passport-config').initialize;
const getUser = require('./passport-config').geteUserByUsername;
const flash = require('express-flash');
const session = require('express-session');
const Database = require('nedb');
const medthodOverride = require('method-override');
const {
    response
} = require('express');
const bcrypt = require('bcrypt');

const imgURL = "https://flashgroupnews.com/wp-json/wp/v2/media/";
const NEWS_URL = "https://flashgroupnews.com/wp-json/wp/v2/posts?";
const coinsURL = "https://ticker-api.cointelegraph.com/rates/?full=true";

initializePassport(passport);

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listining on port ${port}...`));
app.use(express.static('public'));
app.use(medthodOverride('_method'));

app.use(express.urlencoded({
    extended: false
}));

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

const database = new Database('posts.db');
database.loadDatabase();

app.get('/admin', checkUser, (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    return res.render('admin.ejs');
});

app.get('/dashboard', checkAuth, (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
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
app.post('/addPost', (req, res) => {
    const id = req.body.id
    const category = req.body.category;
    console.log('id is :' + req.body.id);
    database.find({
        id: id,
        category: category
    }, (err, docs) => {
        if (err) {
            res.status(500).send();
        }
        database.find({
            category: category
        }, (err, docsy) => {
            if (err) {
                res.status(500).send();
            }
                if (docs.length == 0) {
                    database.insert(req.body);
                    console.log('post added to the database');
                    res.status(200).send();
                } else {
                    console.log('post already exists in the database');
                    res.status(304).send();
                }
           
        });

    });

});

app.get('/getPosts', (req, res) => {
    console.log('getting posts on category: ' + req.query.category + '...');

    database.find({
        category: req.query.category
    }, (err, docs) => {
        res.json(docs);
    });
});

app.post('/removePost', (req, res) => {
    const id = req.body.id;
    const category = req.body.category;
    console.log('remove category is :' + category);
    console.log('remove id is :' + id);

    database.remove({
        id: id,
        category: category
    }, {}, function (err, numRemoved) {
        console.log(`deleted ${id} post`);
    });
});

app.post('/changePassword', checkAuth, async (req, res) => {
    process.env.password = 'this is the new password';
    const username = req.body.username;
    const currentPassowrd = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const recordDB = new Database('auth.db');
    recordDB.loadDatabase();
    if(newPassword === undefined || newPassword === ''){
        res.status(500).send();
    }
    console.log(`user ${username} is about to change password...`);

    const user = await getUser(username);
    if (await bcrypt.compare(currentPassowrd, user.password)) {
        console.log('password matched, initiating papssword changing steps...');

        const passwordHash = await bcrypt.hash(newPassword, 10);
        recordDB.update({
            _id: user._id
        }, {
            $set: {
                password: passwordHash
            }
        }, {}, (err, numUpdated) => {

            if (err) {
                console.log(error);
                res.status(500).send().send();
            }

            if (numUpdated === 1) {
                console.log('passwoerd changed...');
                res.status(200).send();
            } else {
                res.status(500).send();
            }
        });
    } else {
        console.log('password is incorrect');
        res.status(304).send();
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/admin');
});

// auth
function checkUser(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log('user need to login...')
        return next();
    }
    console.log('user session found...')
    res.redirect('/dashboard');
}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');
}