import http from "http";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

  
app.get("/req/phone/:phone/amount/:amount" , (req,res) =>{
   let construct = `
     Payment Successfully made to AKC-LIB.<br /> 
     token: ${Date.now() + "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * "user".length)]}.<br />
     DO NOT SHARE TOKEN.<br />
     you are currently are pro user.<br />
     amount : ${req.params.amount}<br />
     number : ${req.params.phone}
   `;
   res.send(JSON.stringify(construct, null, 2))
})

app.listen(5000 , () => {
  console.log("waiting for requests");
})