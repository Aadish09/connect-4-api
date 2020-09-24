var express = require('express');
var app= express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var auth = require('./auth')
var mongoose = require('mongoose')
var env = require('dotenv');
var Data = require('./data')
var Connect = require('./Connect');
env.config();
var c4 = new Connect();
app.use(bodyParser.json())
mongoose.connect(process.env.URL,{useUnifiedTopology:true,useNewUrlParser:true})
app.get('/',(req,res)=>{
    res.send("Welcome");
})

app.get('/start',(req,res)=>{
    c4.reset();
    const token = jwt.sign({
        data: 'data'
    }, 'Connect-4', { expiresIn: '1h' });
    Data.create({"token":token},(err,data)=>{
        if(err)res.send("Not created");
        else res.json({"state":"start","access_token":token});
    })
    
})

app.post('/move',auth,(req,res)=>{
    var col = req.body.col-1;
    if(c4.isValid(col)){
        var row=c4.makeMove(col);
        var result= c4.checkWin(row,col);
        if(result==="No win"){
            Data.find({token:req.headers['x-access-token']},(err,data)=>{
                data[0].moves.push(c4);
                data[0].save();
            })
            res.send("Valid");
        }
        else{
            Data.find({token:req.headers['x-access-token']},(err,data)=>{
                data[0].moves.push(c4);
                data[0].save();
            })
            res.send(result);
        }
        
    }
    else{
        res.send("Invalid");
    }
})

app.get('/allmoves',(req,res)=>{
    var tok = req.headers['x-access-token'];
    Data.find({token:tok},(err,data)=>{
        res.send(data);
    })
})





app.listen(PORT,(req,res)=>{
    console.log("Server is running");
})