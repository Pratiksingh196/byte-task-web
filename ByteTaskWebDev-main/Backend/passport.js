import passport from "passport";
import GitHubStrategy from "passport-github2";
passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,

    clientSecret: process.env.GITHUB_CLIENT_SECRET,

    callbackURL: "http://localhost:3000/auth/github/callback"

}, function(accessToken, refreshToken, profile, cb) {
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    
    profile.accessToken = accessToken;
    cb(null, profile);

}));

passport.serializeUser((user, done) => {

    // console.log('serializeUser', user);
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    // console.log('deserializeUser', obj);
    done(null, obj);
});