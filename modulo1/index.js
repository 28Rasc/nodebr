

/*
0 Obter usuario
1 Obter o numero de telefone de um usuario a partir do seu id
2 Obter o endereco de usuario pelo id
*/

//importamos um modulo interno do nodejs (util)
const util = require('util');

const obterEnderecoAsync = util.promisify(getAdress);

function getUser() {
  //quando der algum problema - reject(ERRO)
  //quando sucess - resolve
  return new Promise( function resolvePromise(resolve, reject){
    
    setTimeout( () => {
      return resolve({
        id: 1,
        name: 'Aladin',
        bornDate: new Date(),
      })
    }, 1000 );

  })
  
}

function getPhone(userId) {
  return new Promise( function resolvePromise(resolve, reject){
    
    setTimeout( () => {
      return resolve({
        telefone: 997744556,
        ddd: 81
      })
    }, 2000 );

  })
  
}

function getAdress(userId, callback) {

    setTimeout( () => {
      return callback(null, {
        rua: 'Rua dos bobos',
        numero: 000
      })
    }, 2000 );

}

//1ª passo, adcionar a palavra ascync -> automaticamente ela retornará uma promise
main();
async function main() {
  console.time('medida-promise')
  try {
    const usuario = await getUser();
    // const telefone = await getPhone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);

    const resultado = await Promise.all([
      getPhone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])

    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
    Nome: ${usuario.name}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    Endereco: ${endereco.rua},${endereco.numero}
    `)
    console.timeEnd('medida-promise');    
  } catch (error) {
    console.error(error)
  }
}



// const userPromise = getUser();
// // para manipular o sucess usamos a função .then
// // para manipular erros usamos o .catch
// userPromise
// .then((usuario)=> {
//   return getPhone(usuario.id)
//   .then(function resolvePhone(result){
//     return {
//       usuario: {
//         nome: usuario.name,
//         id: usuario.id
//       },
//       telefone: result
//     }
//   })
// })
// .then( (result) => {
//   const endereco = obterEnderecoAsync(result.usuario.id)
//   return endereco.then(function resolvEndereco(resultado) {
//         return{
//           usuario: result.usuario,
//           telefone: result.telefone,
//           endereco: resultado
//         }
//   })
// })
// .then( (result) => {
//   console.log(`
//   nome: ${result.usuario.nome}
//   Endereco: ${result.endereco.rua}, ${result.endereco.numero}
//   Telefone: (${result.telefone.ddd}) ${result.telefone.telefone}`)
//   })

// .catch( (error) => {
//   console.error('DEU RUIM', error);
// })



//---ENTENDENDO CALLBACKs---\\
// getUser( function resolveUser(error, user) {
//   if(error){
//     console.error('Deu ruim em USER', error)
//     return;
//   }

//   getPhoneUser(user.id, function resolvePhone(error1, telefone) {
//     if(error){
//       console.error('Deu ruim em PHONE', error)
//       return;
//     }
  

//   getAdress( user.id, function resolveAdress(error2, adress) {
//     if(error){
//       console.error('Deu ruim em Adress', error)
//       return;
//     }
//     console.log(`
//     Name: ${user.name},
//     Endereco: ${adress.rua},${adress.numero}
//     Telefone: (${telefone.ddd})${telefone.telefone}
//     `)
//   })
//   })
// });




