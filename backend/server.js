const exprss= require('express')
const app = exprss()
const dotenv = require('dotenv');

dotenv.config();

app.get('/',(req,res)=>{
    res.json("hey the port is listining")
})

app.listen(process.env.PORT,()=>{
    console.log("server listining")
})