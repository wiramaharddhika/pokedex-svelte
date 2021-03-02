<script>
  import { onMount } from 'svelte'
  import { fetchPokemonDetail } from 'utils/api.util'

  export let name

  let pokemon

  onMount(async () => {
    pokemon = await fetchPokemonDetail(name)
  })
</script>

{#if !!pokemon}
  <div class="Detail container">
    <div class="flex justify-center">
      <div class="Detail-name capitalize">{pokemon.name}</div>
      <div class="Detail-id">#{pokemon.id}</div>
    </div>
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div>
        <img class="Detail-image" src={pokemon.image} alt="pokemon" />
      </div>
    </div>
  </div>
{/if}
