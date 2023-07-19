const TABLA = 'users'
const auth = require('../auth')

module.exports = function(dbInyectada){
     let db = dbInyectada;

     if(!db){
          db = require('../../DB/mysql');
     }


     function todos(){
          return db.todos(TABLA);
     }
     
     function uno(id){
          return db.uno(TABLA, id);
     }
     
     function eliminar(body){
          return db.eliminar(TABLA, body);
     }
     async function agregar(body){
          const usuario = {
               id: body.id,
               name: body.name,
               isActive: body.isActive
          }

          const respuesta = await db.agregar(TABLA, usuario);

          var insertId = 0;
          if(body.id == 0){
               insertId = respuesta.insertId;
          }else{
               insertId = body.id;
          }
          //funcion para agregar usuario y contraseña
          var respuest2 = ''
          if(body.user && body.password){
               respuest2 = await auth.agregar({
                    id: insertId,
                    user: body.user,
                    password: body.password
               })
          }

          return respuest2;
     }
     
     return {
          todos,
          eliminar,
          agregar,
          uno
     }
     
}