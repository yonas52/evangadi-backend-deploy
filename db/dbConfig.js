const mysql2= require('mysql2');

const dbconnection=mysql2.createPool({
    user: process.env.USER,
  password: process.env.PASSWORD ,
  host: "sql5.freesqldatabase.com",
  database: process.env.DATABASE,
  connectionLimit:10
})




module.exports=dbconnection.promise()