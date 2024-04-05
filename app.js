
require('dotenv').config()
const express=require('express');
const app=express();
// const port=7525;

//corss policy
const cors=require('cors');
app.use(cors());
// app.use(cors({origin:true}));

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
//use CSP policy
// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self' https://localhost:3000 https://evangadi-backend-deploy-3.onrender.com");
//     next();
// });




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

    



































