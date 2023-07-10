import express from "express";
import mysql from 'mysql'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

//db connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
})

//get data from database
app.get('/',(req, res) =>{
    const sql = "SELECT * FROM customer"; //sekect query of student table
    db.query(sql, (err, result) =>{
        if(err)
        return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//insert data into database
app.post('/customer',(req,res)=>{
    const sql = 'INSERT INTO customer (`code`,`customer_name`,`customer_mobile`,`reference_no`,`city`,`customer_email`,`company_name`,`address`,`country`,`gender`,`customer_nic`) VALUES(?)'
    const customerdatavalues = [
        req.body.code,
        req.body.customer_name,
        req.body.customer_mobile,
        req.body.reference_no,
        req.body.city,
        req.body.customer_email,
        req.body.company_name,
        req.body.address,
        req.body.country,
        req.body.gender,
        req.body.customer_nic,
    ]
    db.query(sql,[customerdatavalues], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

//delete data 
app.delete('/delete/:id', (req,res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql,[ req.body.code,
        req.body.customer_name,
        req.body.customer_mobile,
        req.body.reference_no,
        req.body.city,
        req.body.customer_email,
        req.body.company_name,
        req.body.address,
        req.body.country,
        req.body.gender,
        req.body.customer_nic, id], (err, result) => {
            if (err) return res.json({Message: "error inside server"});
            return res.json(result);
        })
})

//open a port for browser connection
app.listen(8080,()=>{
    console.log("Listning...");
})