const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const Database = require('nedb');

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await geteUserByUsername(username);
            console.log(`user ${user.username} logged in...`);
            if (user === undefined) {
                return done(null, false, {
                    message: 'wrong username...!'
                });
            }
            
            if (await bcrypt.compare(password, user.password)) {
                console.log('password matches')
                return done(null, user);
            } else {
                console.log('password not matches')
                return done(null, false, {
                    message: 'password is incorrect'
                })
            }
        } catch (e) {
            return done(e);
        }
    }
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((user, done) => {
        return done(null, true);
    });
}

function geteUserByUsername(username) {
    const database = new Database('auth.db');
    database.loadDatabase();
    let user;
    return new Promise((resolve, reject) => {
        database.find({
            username: username
        }, (err, docs) => {
            if (docs !== undefined && docs.length === 1) {
                console.log('retriving user data...')
                user = docs[0];
                console.log('found user: ' + user.username);
                resolve(user);
            } else {
                reject('Either there is no such user or too many records');
            }
        });
    });
}

module.exports = {
    initialize,
    geteUserByUsername
};