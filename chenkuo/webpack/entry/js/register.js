var express=require("express");
var querystring=require("querystring");
var mysql=require("mysql");
var router = express.Router();
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hammer"
});
connection.connect();
router.post("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Content-Type","text/plain;charset=UTF-8");
    var data='';
    var params;
    req.on("data",(chunk)=>{
        data+=chunk;
    })
    req.on("end",()=>{
        params = querystring.parse(data);
        console.log(params);
        connection.query(`SELECT*FROM register WHERE telphone='${params.telphone}'`,function(error,results,fields){
            console.log(results);
            if(results.length>0){
                res.end('0');
            }else{
                connection.query("INSERT INTO register(`telphone`,`password`,`email`) VALUES('"+params.telphone+"','"+params.password+"','"+params.email+"')",function(error,results,fields){
                    res.end('1');
                })
            }
        })
    })
//
})




module.exports = router;