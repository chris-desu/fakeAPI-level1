import http from "http";
import express from "express";
import cors from "cors";
import fs from "fs";
let app = express();
app.use(cors());

app.get("/subscribe/phone/:phone/amount/:amount", (req,res) =>{
    let phone = req.params.phone;
    let amount = req.params.amount;
    
    //register and continue;
    try{
      fs.readFile("register.json" , "utf8" , (failed , result) =>{
        if(failed) throw new Error('failed to read');
        let fileObj = JSON.parse(result);
        
        fileObj["phone"] = phone;
        fileObj["amount"] = amount;
        
        fs.writeFile("register.json" , JSON.stringify(fileObj , null , 5) , (bad) =>{
          if(bad) throw new Error('can work');
          
           fs.readFile("register.json" , "utf8" , ($bad,$data) =>{
             if($bad) throw new Error($bad);
             let body = JSON.parse($data)
             
             //passing as async herr
               async function sender() {
                 let send = await fetch(`http://localhost:5000/req/phone/${body["phone"]}/amount/${body["amount"]}`);
                 let ress = await send.json();
                 res.send(JSON.stringify(ress));
               }
               sender();
             //ends
             
           })
        })
      })
      
    }catch(err){
      console.log(err)
    }
    
})

app.listen(3000 , () =>{
  console.log(true)
})
