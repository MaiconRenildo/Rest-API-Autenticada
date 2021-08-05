//MODEL
const Sequelize=require("sequelize");
const connection=require("../database/database");

const Game=connection.define("games",{
  name:{
    type: Sequelize.STRING,
    allowNull:false
  },
  price:{
    type: Sequelize.TEXT,
    allowNull:false
  }
})

// Já está criada então não há necessidade
/*
Game.sync({force: false}).then(()=>{
  console.log('Tabela games criada com sucesso')
})
*/
module.exports=Game;