import axios from 'axios'
import { API_URL } from 'constants/api.constant'
import { mapPokemonDetail } from './map.util'

export const fetchPokemonDetail = async (idOrName) => {
  const response = await axios.get(`${API_URL}/pokemon/${idOrName}`)
  return mapPokemonDetail(response.data)
}

export const fetchPokemonEvolutionChain = async (idOrName) => {
  const speciesResponse = await axios.get(
    `${API_URL}/pokemon-species/${idOrName}`
  )
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url

  const evolutionChainResponse = await axios.get(evolutionChainUrl)
  let evolutionChainRaw = evolutionChainResponse.data.chain

  const evolutionChainList = [evolutionChainRaw.species.name]

  while (evolutionChainRaw.evolves_to && evolutionChainRaw.evolves_to.length) {
    evolutionChainList.push(evolutionChainRaw.evolves_to[0].species.name)
    evolutionChainRaw = evolutionChainRaw.evolves_to[0]
  }

  return evolutionChainList
}
