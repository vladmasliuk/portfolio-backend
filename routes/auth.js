const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// login
router.post("/login", async (req, res)=> {
    try{
        const user = await User.findOne({
            username: req.body.username
        })
        !user && res.status(401).json("Wrong pass or username");

        // decrypt pass
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY);
        const originalPass = bytes.toString(CryptoJS.enc.Utf8);

        originalPass !== req.body.password && res.status(401).json("Wrong pass or username");

        const accessToken = jwt.sign(
            {id: user._id,sAdmin: user.isAdmin},
            process.env.PASS_SECRET_KEY, {expiresIn: "1d"}
        )

        const {password, ...info} = user._doc;

        res.status(200).json({...info, accessToken});
    }catch{
        res.status(500).json(err);
    }
});

module.exports = router;