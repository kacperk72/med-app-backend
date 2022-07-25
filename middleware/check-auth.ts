const jwt = require("jsonwebtoken");

module.exports = (req:any, res:any) => {
    try {
        const token = req.headers. authorization.split(" ")[1];
        jwt.verify(token, "secret_key_for_json_token")
    } catch (error) {
        res.status(401).json({message: "Auth failed!"});
    }
}