import axios from 'axios'
import { API_URL } from 'constants/api.constant'
import { mapPokemonDetail } from './map.util'

export const fetchPokemonDetail = async (idOrName) => {
  const response = await axios.get(`${API_URL}/${idOrName}`)
  return mapPokemonDetail(response.data)
}
