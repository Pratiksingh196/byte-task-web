import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';


import authRouter from './routes/auth.routes.js';




const passportSetup = import('./passport.js');



dotenv.config();


const app = express();

app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : true
}))
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/auth', authRouter );

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});