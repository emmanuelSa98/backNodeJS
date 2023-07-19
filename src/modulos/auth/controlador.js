const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth')

module.exports = function(dbInyectada){
     let db = dbInyectada;

     if(!db){
          db = require('../../DB/mysql');
     }
    
     async function agregar(data){
          const authData = {
               id : data.id
          }
          if(data.user){
               authData.user = data.user
          }
          if(data.password){
               authData.password = await bcrypt.hash( data.password.toString() , 5)
          }
          return db.agregar(TABLA, authData);
     }


     async function login(user, password){
          const data = await db.query(TABLA, {user: user});

          return bcrypt.compare(password, data.password)
          .then( resultado=>{
               if(resultado === true){
                    //generar un token
                    return auth.asigToken({...data})

               }else{
                    throw new Error('Información invalida')
               }
          });
     }
     
     return {
          agregar,
          login
     }
     
}