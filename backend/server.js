import express from "express";
import mysql from 'mysql'
import cors from 'cors'

const app = express();

app.use(cors());

//db connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
})

//get data from database
app.get('/',(req, res) =>{
    const sql = "SELECT * FROM student"; //sekect query of student table
    db.query(sql, (err, result) =>{
        // if(err)
        // return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//open a port for browser connection
app.listen(8081,()=>{
    console.log("Listning...");
})