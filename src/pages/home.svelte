<script>
  import { onMount } from 'svelte'
  import { Link } from 'svelte-routing'
  import Card from 'components/card.svelte'
  import { fetchPokemonList } from 'utils/api.util'

  let pokemonList = []

  onMount(async () => {
    pokemonList = await fetchPokemonList()
  })
</script>

<div class="container mx-auto px-4">
  {#each pokemonList as pokemon}
    <Link>
      <Card
        id={pokemon.id}
        name={pokemon.name}
        imageUrl={pokemon.sprites.other.dream_world.front_default}
        types={pokemon.types.map((type) => type.type.name)}
      />
    </Link>
  {/each}
</div>
