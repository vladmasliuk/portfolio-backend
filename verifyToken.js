const jwt = require("jsonwebtoken");

function verify(req, res, next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.PASS_SECRET_KEY, (err, user)=>{
            if(err) res.status(403).json("Token is not walid");
            req.user = user;
            next();
        })
    } else{
        return res.status(401).json("You are not login");
    }
}

module.exports = verify;