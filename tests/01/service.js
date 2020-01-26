const {get} = require('axios')

const URL = 'https://swapi.co/api/people'

async function getPeople(nome) {
  const url = `${URL}/?search=${nome}&format=json`
  const result = await get(url)
  console.log(result.data)
  return result.data.results.map(maperPessoas)

}

function maperPessoas( item ) {
  return {
    nome: item.name,
    peso: item.height
  }
}

module.exports = {
  getPeople
}