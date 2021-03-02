<script>
  import { onMount } from 'svelte'
  import { Link } from 'svelte-routing'
  import InfiniteScroll from 'svelte-infinite-scroll'
  import InfiniteLoading from 'svelte-infinite-loading'
  import PokemonCard from 'components/pokemon-card.svelte'
  import { fetchPokemonUrlList } from 'utils/api.util'

  let pokemonUrlList = []
  let page = 1

  onMount(() => {
    loadPokemonUrlList()
  })

  const loadPokemonUrlList = async () => {
    const newPokemonUrlList = await fetchPokemonUrlList(page)
    pokemonUrlList = pokemonUrlList.concat(newPokemonUrlList)
    page++
  }

  const onInfinite = async ({ detail: { loaded } }) => {
    await loadPokemonUrlList()
    loaded()
  }
</script>

<div class="Home container p-4">
  <ul class="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
    {#each pokemonUrlList as url}
      <li>
        <PokemonCard {url} />
      </li>
    {/each}
    <InfiniteLoading on:infinite={onInfinite} />
  </ul>
</div>
