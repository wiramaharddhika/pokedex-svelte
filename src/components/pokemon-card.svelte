<script>
  import { onMount } from 'svelte'
  import FastAverageColor from 'fast-average-color'
  import { pokemonList } from 'stores/pokemon.store'
  import PokemonTypeBadge from './pokemon-type-badge.svelte'
  import { fetchPokemonDetail } from 'utils/api.util'

  export let idOrName

  let pokemon
  let style

  onMount(async () => {
    if (!$pokemonList[idOrName]) {
      pokemon = await fetchPokemonDetail(idOrName)

      const id = Number(pokemon.id)
      const name = pokemon.name
      pokemonList.update((list) => ({
        ...list,
        [id]: pokemon,
        [name]: pokemon,
      }))
    } else {
      pokemon = $pokemonList[idOrName]
    }
  })

  const onImageLoad = () => {
    const image = document.getElementById(`pokemon-${pokemon.id}`)
    const fastAverageColor = new FastAverageColor()
    const color = fastAverageColor.getColor(image).hex
    style = `background-color: ${color}`
  }
</script>

<div class="PokemonCard rounded-md shadow-md" {style}>
  {#if !!pokemon}
    <div class="relative p-4">
      <h3
        class="PokemonCard-id absolute bottom-12 left-5 text-white text-6xl font-bold opacity-70"
      >
        #{pokemon.id}
      </h3>
      <h2
        class="PokemonCard-name text-lg text-white capitalize font-medium text-shadow"
      >
        {pokemon.name}
      </h2>
      <img
        class="PokemonCard-image h-48 mx-auto"
        on:load={onImageLoad}
        crossOrigin="anonymous"
        id={`pokemon-${pokemon.id}`}
        src={pokemon.image}
        alt="pokemon"
      />
      <div class="flex justify-end">
        {#each pokemon.types as type}
          <PokemonTypeBadge {type} />
        {/each}
      </div>
    </div>
  {:else}
    <div class="p-4">
      <img
        class="Pokemon-loading h-48"
        src="images/loading.gif"
        alt="loading"
      />
    </div>
  {/if}
</div>
