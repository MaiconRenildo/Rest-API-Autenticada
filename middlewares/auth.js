const jwt=require("jsonwebtoken");
const jwtSecret="asadasdasdads";

function auth(req,res,next){
  const authToken=req.headers["authorization"];
  if(authToken!=undefined){
    const bearer=authToken.split(" ");
    var token=bearer[1];

    jwt.verify(token,jwtSecret,(err,data)=>{
      if(err){
        res.status(401);
        res.json({err:"token invalido"});
      }else{
        req.token=token;
        req.loggedUser={id:data.id,email:data.email}
        next();
      }
    })
    //next();
  }else{
    res.status(401);
    res.json({err:"token inválido"})
  }
}

module.exports=auth;