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
    res.json({games});
  }).catch(()=>{
    res.sendStatus(400);
  })
});

//Busca apenas um game
router.get('/game/:id',auth,(req,res)=>{
  let id=req.params.id;

  if(isNaN(id)){
    res.sendStatus(400);
  }else{
    Games.findOne({
      where:{
        id:id
      }
    }).then(game=>{
      if(game==null){
        res.sendStatus(404);
      }else{
        res.statusCode=200;
        res.json(game)
      }
    }).catch(()=>{
      res.sendStatus(404);
    })
  }
});

//Deleta game
router.delete("/game/:id",auth,(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.sendStatus(400);
  }else{
    Games.destroy({
      where:{
        id:id
      }
    }).then(()=>{
      res.sendStatus(200);
    }).catch(()=>{
      res.sendStatus(400);
    })
  }
});

//Cria game
router.post('/game',auth,(req,res)=>{
  let name=req.body.name;
  let price=req.body.price;
  price=price.replace(',','.');

  if(name==undefined || price==undefined){
    res.sendStatus(404)
  }else{
    if((name.trim()=="" || price.trim()=="") || isNaN(price)==true ){
      res.sendStatus(404)
    }else{
      Games.create({
        name:name,
        price:price
      }).then(()=>{
        res.sendStatus(201);
      }).catch(()=>{
        res.sendStatus(400)
      })
    }
  }
})

//Atualiza game
router.put("/game/:id",auth,(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.sendStatus(404);
  }else{
    let newName=req.body.name;
    let newPrice=req.body.price;
    newPrice=newPrice.replace(',','.');
    let object={}

    if(newPrice==undefined && newName==undefined){
      res.sendStatus(404);
    }else{
      if( (newPrice!=undefined && newPrice.trim()!="") && (isNaN(newPrice)!=true) ) object.price=newPrice;
      if(newName!=undefined && newName.trim()!="") object.name=newName;
    }

    if((Object.entries(object).length==0)){
      res.sendStatus(404);
    }else{
      Games.update(object,{
        where:{
          id:id
        }
      }).then(()=>{
        res.sendStatus(200);
      }).catch(()=>{
        res.sendStatus(404);
      })
    } 
  }
})

module.exports=router;