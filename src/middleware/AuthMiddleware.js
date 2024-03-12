const jwt = require("jsonwebtoken")

// Checking the user is login or not

module.exports=(req, res, next)=>{
    let token = req.headers["token"];
    jwt.verify(token, "123-abc", function (err, decodeData){
        if (err){
            res.status(401).json({status: "Unauthorized"})
        }
        else {
            req.headers.email = decodeData["data"]
            next();
        }
    })
}
