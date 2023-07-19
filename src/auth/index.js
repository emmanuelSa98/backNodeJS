const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/errors')

const secret = config.jwt.secret;

function asigToken(data){
     return jwt.sign(data, secret)
}

function verificarToken(token){
     return jwt.verify(token, secret)
}

const chequearToken = {
     confirmarToken : function(req, id){
          const decodificado = decodificarCabecera(req);

          if(decodificado.id != id){
               throw error('No tienes privilegios para hacer esto', 401);
          }
     }
}
function obtenetToken(autorizacion){
     if(!autorizacion){
          throw error('No hay token', 401);
     }
     if(autorizacion.indexOf('Bearer') === -1){
          throw error('Formato invalido' , 401);
     }

     let token = autorizacion.replace('Bearer ' , '')
     return token;
}

function decodificarCabecera(req){
     const autorizacion = req.headers.authorization || '';
     const token = obtenetToken(autorizacion);
     const decodificado = verificarToken(token);

     req.user = decodificado;

     return decodificado; 
}

module.exports ={
     asigToken,
     chequearToken
 } 