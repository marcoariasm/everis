import express from 'express';
import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import User from './User';
import { IMongoDBUser } from './types';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

dotenv.config();

const app = express();

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to ongoose successfully');
});

// Middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(
    session({
        secret:"secretcode",
        resave: true,
        saveUninitialized: true
    })
);
// app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user: IMongoDBUser, done: any) =>{
    return done(null, user._id);
});


passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, doc: IMongoDBUser) => {
        // whatever we return goes to the client and binds to the reg.user property
        return done(null, doc)
    })
})

// Login with Google
// Create a User in mongoDB
// Serialize & deserialize -> Grab that user from the database and return him


passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/callback"
  },
  function(_: any, __: any, profile: any, cb: any) {
    //   Successfull Authentication
    // insert into Database
    User.findOne({ googleId: profile.id }, async (err: Error, doc: IMongoDBUser) => {

        if (err) {
            return cb(err, null);
        }
        if (!doc){
            // create one
            const newUser = new User({
                googleId: profile.id,
                username: profile.name.givenName
            });

            await newUser.save();
            cb(null, newUser)
        }
        cb(null,doc);
    })

    // console.log('profile ->',profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));


passport.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  function(_: any, __: any, profile: any, cb: any) {
    //   Successfull Authentication
    // insert into Database
    User.findOne({ githubId: profile.id }, async (err: Error, doc: IMongoDBUser) => {

        if (err) {
            return cb(err, null);
        }
        if (!doc){
            // create one
            const newUser = new User({
                githubId: profile.id,
                username: profile.username
            });

            await newUser.save();
            cb(null, newUser)
        }
        cb(null,doc);
    });
    // cb(null, profile)
    // console.log('profile ->',profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });



app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');  
  });




app.get('/', (req, res) => {
    res.send("Hola mundo!");
})

app.get("/getuser", (req, res) => {
    res.send(req.user);
})

app.get("/auth/logout", (req, res) => {
    if (req.user){
        req.logout();
        res.send("success");
    }
})

app.listen(4000, () => {
    console.log('Server started!');
})