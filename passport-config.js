const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const Database = require('nedb');

const database = new Database('auth.db');
database.loadDatabase();

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await geteUserByUsername(username);
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
    let user;
    return new Promise((resolve, reject) => {
        database.find({
            username: username
        }, (err, docs) => {
            if (docs !== undefined && docs.length === 1) {
                user = docs[0];
                resolve(user);
            }else{
                reject(user);
            }
        });
    });
}

module.exports = initialize;