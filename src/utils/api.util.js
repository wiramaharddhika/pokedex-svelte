import axios from 'axios'
import { API_URL } from 'constants/api.constant'
import { mapPokemonDetail } from './map.util'

export const fetchPokemonUrlList = async (page) => {
  const limit = 12
  const offset = (page - 1) * limit
  const response = await axios.get(`${API_URL}?offset=${offset}&limit=${limit}`)
  const pokemonList = response.data.results  
  return pokemonList.map((pokemon) => pokemon.url)
}

export const fetchPokemonByUrl = async (url) => {
  const response = await axios.get(url)
  return mapPokemonDetail(response.data)
}

export const fetchPokemonDetail = async (idOrName) => {
  const response = await axios.get(`${API_URL}/${idOrName}`)
  return mapPokemonDetail(response.data)
}