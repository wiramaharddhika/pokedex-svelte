import axios from 'axios';
import { API_URL } from 'constants/api.constant';

export const fetchPokemonList = async () => {
  const pokemonListResponse = await axios.get(API_URL);
  const pokemonList = pokemonListResponse.data.results  
  const pokemonDetailFetchList = pokemonList.map((pokemon) =>
    axios.get(pokemon.url)
  )
  const pokemonDetailListResponse = await Promise.all(pokemonDetailFetchList)
  const pokemonDetailList = pokemonDetailListResponse.map(
    (pokemonDetailResponse) => pokemonDetailResponse.data
  )
  return pokemonDetailList;
}