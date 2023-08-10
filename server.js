const express = require ('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const {dbConnection} = require('./backend/config/db')
const DB = require('./backend/database/dbHelpers')
const userRouter = require('./backend/routes/userRoutes')
const projectRouter = require('./backend/routes/projectRoutes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// error handling middleware
app.use(cors())
app.use((err, req, res, next)=>{
    res.json({Error: err})
})

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // You can replace * with specific origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use('/api/v1/users', userRouter)
app.use('/api/v1/projects', projectRouter)


app.listen(process.env.PORT, async() => {
    await dbConnection()
    console.log(`Server is running on port ${process.env.PORT}`)
})


