import { writable } from 'svelte/store'

const LOCAL_STORAGE_KEY = 'pokemon-list'

const initialValue = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  : {}

export const pokemonList = writable(initialValue)

pokemonList.subscribe((list) => {
  localStorage.setItem('pokemon-list', JSON.stringify(list))
})
