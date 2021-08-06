const express=require('express');
const router=express.Router();

const jwt=require("jsonwebtoken");
const jwtSecret="asadasdasdads";

const bcrypt=require("bcryptjs")
const User=require("./Users")

router.post("/authentication",(req,res)=>{
  var password=req.body.password
  var email=req.body.email
  User.findOne({
    where:{
      email:email
    }
  }).then(user=>{
    if(user!=undefined){
      var correct=bcrypt.compareSync(password,user.password)
      if(correct){
        jwt.sign({id:user.id,email:user.email},jwtSecret,{expiresIn:"48h"},(err,token)=>{
          if(err){
            res.status(404);
            res.json({err:"O processo de geração do token falhou."});
          }else{
            res.status(200);
            res.json({token:token})
          }
        })
      }else{
        res.status(401);
        res.json({err:"Senha inválida"})
      }
    }else{
      res.status(401);
      res.json({err:"Este e-mail não está cadastrado na base de dados"})
    }
  }).catch(()=>{
    res.status(404);
    res.json({err:"O processo de busca no banco de dados falhou."})
  })
})

module.exports=router;