const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
  Commander
  .version('v1')
  .option('-n, --nome [value]', "Nome do Heroi")
  .option('-p, --poder [value]', "Poder do Heroi")
  .option('-i, --id [value]', "id do Heroi")
  
  .option('-c, --cadastrar', "Cadastrar um Heroi")
  .option('-l, --listar', "Listar um Heroi")
  .option('-a, --atualizar [value]', "Atualizar um Heroi")
  .option('-r, --remover', "remover um Heroi")
  .parse(process.argv)

  const heroi = new Heroi(Commander)

  try {

    if(Commander.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi)
      if(!resultado) {
        console.error('heroi não foi cadastrado!')
        return;
      }
      console.log('Heroi cadastrado com sucesso!')
    }

    if(Commander.listar) {
      const resultado = await Database.listar()
      console.log(resultado)
    }
    if(Commander.remover) {
      const resultado = await Database.remover(heroi.id)
      if(!resultado){
        console.error('Nao foi possivel remover o Heroi')
        return;
      }
      console.log('Heroi removido com sucesso!')
    }
    if(Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
      if(!resultado) {
        console.error('Nao foi possivel atualizaar o heroi')
        return;
      }
      console.log('Heroi atualizado com sucesso!')

    }
    
  } catch (error) {
    console.error('Deu ruim', error)
  }

}

main()