const Sequelize=require('sequelize')

const database='gamesapi'
const username='root'
const password='123'

const connection=new Sequelize(database,username,password,{
  host:'localhost',
  dialect:'mysql'
})

module.exports=connection;
