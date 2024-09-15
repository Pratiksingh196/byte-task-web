import axios from "axios";
import passport from "passport"


export const  gitAuth = async (req, res) => {
    passport.authenticate('github', { scope: [ 'user:email' ] })(req, res);
}

export const callBackFunction = async (req, res) => {
    passport.authenticate('github', { failureRedirect: '/auth/login/failed' })(req, res, function () {
        
        
        res.redirect('/auth/login/success');
      });
}
export const loginFailed = async (req, res) => {

    return res.send({success : false, message: 'Login failed'})
}

export const loginSuccess = async (req, res) => {
    try {
        // const accessToken = req;
        // console.log('accessToken', accessToken);
        // console.log(req);
        
        if (req.user) {
            return res.status(200).json({
                token : req.user.accessToken,
                success: true,
                message: 'Login success',
                user: req.user,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Login failed'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
}

export const subScriptionValidation = async (req, res) => {
    try{
    
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: 'Subscription is not valid'
            });
        }

        const token = req.user.accessToken;
        const username = req.user.username;

        

        const response = await axios.get(`https://api.github.com/users/${username}/following/bytemait`, {
            
            headers: {
                
                Authorization: `token ${token}`
            }
        });
        
        if(response.status === 204){
            return res.status(200).json({
                success: true,
                message: 'Subscription is valid'
            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'Subscription is not valid'
            });
        }

        

    }catch{

    }
}

export const logoutGitHub = async (req, res) => {
    try{
        console.log("LOGOUT")
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: 'User is not logged in'
            });
        }
        req.logout();
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    }catch{


    }
}