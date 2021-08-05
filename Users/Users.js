const Sequelize=require("sequelize")
const connection=require("../database/database");

const User=connection.define("users",{
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

// Já está criada então não há necessidade
/*
User.sync({force:false}).then(()=>{
  console.log('Tabela de usuarios criada com sucesso')
})
*/
module.exports=User