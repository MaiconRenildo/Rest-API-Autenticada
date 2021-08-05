const express=require('express');
const app=express();

const cors=require("cors");
app.use(cors());

//Invoca o BodyParser embutido do express a fim de converter o body das requisições
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const GamesController=require("./Games/GamesController")
app.use('/',GamesController); //Habilita o uso das rotas de games

const UsersController=require("./Users/UsersController");
app.use('/',UsersController);

const connection=require("./database/database");
connection  
  .authenticate()
  .then(()=>{
    console.log('Conexão feita com sucesso')
  })
  .catch((msgErro)=>{
    console.log(msgErro)
  });

app.listen(8080,()=>{
  console.log('Servidor rodando')
});