<script>
  import { Link } from 'svelte-routing'
  import InfiniteLoading from 'svelte-infinite-loading'
  import PokemonCard from 'components/pokemon-card.svelte'
  import PokemonInput from 'components/pokemon-input.svelte'

  const MAX = 898
  let total = 12

  const onInfinite = async ({ detail: { loaded, completed } }) => {
    if (total < MAX) {
      total = total + 12 > MAX ? MAX : total + 12
      loaded()
    } else {
      completed()
    }
  }
</script>

<div class="Home container p-4">
  <img
    class="Home-logo w-auto h-48 mx-auto mt-8 mb-12"
    src="/images/pokemon-logo.png"
    alt="pokemon-logo"
  />

  <PokemonInput />

  <ul class="Home-list grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
    {#each [...Array(total).keys()] as number}
      <li>
        <Link to={`/${number + 1}`}>
          <PokemonCard idOrName={number + 1} />
        </Link>
      </li>
    {/each}
    <InfiniteLoading on:infinite={onInfinite} />
  </ul>
</div>
