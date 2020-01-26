const service = require('./service')

Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = []
  for( let indice = 0; indice <= this.length - 1; indice++ ){
    const resultado = callback(this[indice], indice)
    novoArrayMapeado.push(resultado)
  }
  return novoArrayMapeado;
}

async function main() {
  try {

  //   const names = []
    const results = await service.getPeople('a')
  //   results.results.forEach( item => names.push(item.name));

  //  const names = results.results.map( pessoa => pessoa.name )
  
      const names = results.results.meuMap( function( pessoa, indice ) {
        return `[${indice}]${pessoa.name}`
      })

      console.log(`names`, names)

  } catch (error) {
    console.error(`deu ruim`,error)
    
  }
}

main()