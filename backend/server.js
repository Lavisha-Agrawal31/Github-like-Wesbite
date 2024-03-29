import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';


import "./passport/github.auth.js"

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import exploreRoutes from  './routes/explore.route.js';

import connectMongoDB from './db/connectMongoDB.js';

dotenv.config(); //allows  us to access the environment variables we set in our file  .env

const app = express();



app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes)



app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
    connectMongoDB();// Connecting to MongoDB database using mongoose 
});