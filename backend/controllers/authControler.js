const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DB = require('../database/dbHelpers');
const {StatusCodes} = require('http-status-codes');
// const {loginSchema} = require('../validators/inputFields')

const loginUser = async (req, res, next) => {
    
    
    try {

        const {email, password} = req.body

            // const {error} = loginSchema.validate(req.body)

            // if(error){
            // return res.status(422).json(error.details)
            // }

    
        const user = await (await DB.executeProcedure('userLogin',{email})).recordset[0]
        console.log(user)
        if(user){
            const hashedPassword = await user.password
    
            const isMatch = await bcrypt.compare(password, hashedPassword)
    
            if (isMatch){
    
                const {password, ...payload} = user
    
                const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
                res.status(StatusCodes.OK)
    
                res.json({message:"login successful",token})
    
            }else{
                res.status(StatusCodes.UNAUTHORIZED)
    
                res.json({message:"login failed , invalid credentials"})
    
            }
    
        }else{
            res.status(StatusCodes.UNAUTHORIZED)
    
            res.json({message:" You are not registered , please register first"})

        }     
    } catch (error) {
        console.log(error)
    }
    
    
    };

    const getLoggedInUser = async (req,res)=>{

        if(req.info){
            const loggedInUser = req.info ; 
            return res.json ({loggedInUser})
        }

    }

module.exports = {
    loginUser,
    getLoggedInUser
}