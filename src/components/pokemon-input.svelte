<script>
  import { navigate } from 'svelte-routing'
  import { pokemonList } from 'stores/pokemon.store'
  import { fetchPokemonDetail } from 'utils/api.util'

  const ERROR_MESSAGE = 'Pokemon not found'
  let idOrName = ''
  let isError = false

  const findPokemon = async () => {
    if (isNaN(idOrName)) {
      idOrName = idOrName.toLowerCase()
    }

    if (!!$pokemonList[idOrName]) {
      navigateToDetailPage()
    }

    try {
      await fetchPokemonDetail(idOrName)
      navigateToDetailPage()
    } catch {
      isError = true
    }
  }

  const navigateToDetailPage = () => {
    navigate(`/${idOrName}`)
  }

  const resetError = () => {
    isError = false
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      findPokemon()
    }
  }
</script>

<div class="PokemonInput mb-8">
  <div class="text-lg">
    <input
      bind:value={idOrName}
      on:change={resetError}
      on:keypress={onKeyPress}
      placeholder="Pokemon ID or Name"
      class="border border-gray-500 py-1 px-2 rounded mr-2"
    />
    <button
      on:click={findPokemon}
      class="border border-yellow-500 bg-yellow-400 text-white py-1 px-6 text-center rounded"
      >Find</button
    >
  </div>

  {#if isError}
    <div class="text-red-500">{ERROR_MESSAGE}</div>
  {/if}
</div>
