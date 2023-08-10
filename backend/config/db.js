const mssql = require('mssql')
require('dotenv').config()
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'BARACUDA-PC\\BARACUDASERVER',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}




const dbConnection = async ()=>{
    try {

       const pool = await mssql.connect(sqlConfig)
        console.log('Database connected Successfully')
        return pool
        
    } catch (error) {
        
        console.log(error)
    }

}



// export the sqlconfig 
module.exports = { sqlConfig, dbConnection}




