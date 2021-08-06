const express=require('express');
const router=express.Router();
//const sequelize=require('sequelize')
const Games=require("./Games")  //Busca o model

const jwt=require("jsonwebtoken");
const jwtSecret="asadasdasdads";
const auth=require("../middlewares/auth");

//Busca todos os games
router.get('/games',auth,(req,res)=>{
  Games.findAll({}).then(games=>{
    res.statusCode=200;
    res.json(games);
  }).catch(()=>{
    res.status(404);
    res.json({err:"O processo de busca no banco de dados falhou."})
  })
});

//Busca apenas um game
router.get('/game/:id',auth,(req,res)=>{
  let id=req.params.id;

  if(isNaN(id)){
    res.status(400);
    res.json({err:"Id inválido."})
  }else{
    Games.findOne({
      where:{
        id:id
      }
    }).then(game=>{
      if(game==null){
        res.status(404);
        res.json({err:"Game não encontrado"})
      }else{
        res.statusCode=200;
        res.json(game)
      }
    }).catch(()=>{
      res.status(404);
      res.json({err:"O processo de busca no banco de dados falhou."})
    })
  }
});

//Deleta game
router.delete("/game/:id",auth,(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.status(400);
    res.json({err:"Id inválido."})
  }else{
    Games.destroy({
      where:{
        id:id
      }
    }).then((game)=>{
      if(game==0){
        res.status(404);
        res.json({err:"Game não encontrado"})
      }else{
        res.status(200);
        res.json({res:"OK!"})
      }
    }).catch(()=>{
      res.status(404);
      res.json({err:"O processo de busca no banco de dados falhou."})
    })
  }
});

//Cria game
router.post('/game',auth,(req,res)=>{
  let name=req.body.name;
  let price=req.body.price;
  price=price.replace(',','.');

  if(name==undefined || price==undefined){
    res.status(400);
    res.json({err:"Parâmetros não preenchidos."})
  }else{
    if((name.trim()=="" || price.trim()=="") || isNaN(price)==true ){
      res.status(400);
      res.json({err:"Parâmetros não preenchidos corretamente."})
    }else{
      Games.create({
        name:name,
        price:price
      }).then(()=>{
        res.status(201);
        res.json({res:"OK!"})
      }).catch(()=>{
        res.status(404);
        res.json({err:"O processo de busca no banco de dados falhou."})
      })
    }
  }
})

//Atualiza game
router.put("/game/:id",auth,(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.status(400);
    res.json({err:"Id inválido."})
  }else{
    let newName=req.body.name;
    let newPrice=req.body.price;
    newPrice=newPrice.replace(',','.');
    let object={}

    if(newPrice==undefined && newName==undefined){
      res.status(400);
      res.json({err:"Parâmetros não preenchidos."})
    }else{
      if( (newPrice!=undefined && newPrice.trim()!="") && (isNaN(newPrice)!=true) ) object.price=newPrice;
      if(newName!=undefined && newName.trim()!="") object.name=newName;
    }

    if((Object.entries(object).length==0)){
      res.status(400);
      res.json({err:"Parâmetros não preenchidos corretamente."})
    }else{
      Games.update(object,{
        where:{
          id:id
        }
      }).then((games)=>{
        if(games==0){
          res.status(404);
          res.json({err:"Game não encontrado"})
        }else{
          res.status(200);
          res.json({res:"OK!"})
        }
      }).catch(()=>{
        res.status(404);
        res.json({err:"O processo de busca no banco de dados falhou."})
      })
    } 
  }
})

module.exports=router;