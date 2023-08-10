const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
require('dotenv').config();


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"})
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.info = decodedData;
        console.log(decodedData)
        // calling the next middleware function
        next()
    //    return  res.status(StatusCodes.OK).json({message:"Authorized"})
        
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"})
        

    }
    
    
}

module.exports = {
    verifyToken
}
