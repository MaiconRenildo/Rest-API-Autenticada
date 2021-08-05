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
            res.status(400);
            res.json({err:"Falha interna"});
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
  }).catch((err)=>{
    res.status(404);
    res.json({"erro": err})
  })
})

module.exports=router;

/*
//Banco de dados falso
const DB=require("../database/objeto")

////////////////////USERS
router.post("/auth",(req,res)=>{
  var {email,password}=req.body;

  if(email!= undefined){
    var user=DB.users.find(u=>u.email==email);

    if(user!= undefined){
      if(user.password==password){
        jwt.sign({id:user.id,email:user.email},jwtSecret,{expiresIn:"48h"},(err,token)=>{
          if(err){
            res.status(400);
            res.json({err:"Falha interna"});
          }else{
            res.status(200);
            res.json({token:token})
          }
        })

      }else{
        res.status(401);
        res.json({err:"Credenciais inválidas"})
      }
    }else{
      res.status(404);
      res.json({err:"O E-mail enviado não existe na base de dados"})
    }

  }else{
    res.status(400);
    res.json({err:"O E-mail enviado é inválido"})
  }
})
*/