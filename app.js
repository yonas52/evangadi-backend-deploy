
require('dotenv').config()
const express=require('express');
const app=express();
// const port=7525;

//corss policy
const cors=require('cors');
app.use(cors());

//db connection
const dbconnection=require('./db/dbConfig');


// user routes middleware file
const useRoutes=require('./routes/userRoute');

// question routes middleware file
const questionRoutes=require('./routes/questionRoute');

// answer routes middleware file
const answerRoutes=require('./routes/answerRoute');

//authenticatin middleware file
const authMiddleware=require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json())

//body-parser middle ware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// user routes middleware
app.use('/api/users',useRoutes)

async function start(){
    try {
        const result= await dbconnection.execute("select 'test'")
        const port = process.env.PORT || 5500;
        await app.listen(port)
       
        console.log('database connection established')
        console.log(`listening on ${port} `)
    } catch (error) {
        console.log(error.message)
    }
}
 start()


//questions routes middleware
app.use("/api/questions",questionRoutes)

//answers route middleware
app.use("/api/answers" ,answerRoutes)

    


































////////users//////////
// USE your_database_name;
// CREATE TABLE if not exists users(
//     userid  INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//      email VARCHAR(40) NOT NULL,
//      Password VARCHAR(100) NOT NULL,
//     PRIMARY KEY (userid)
//   );
