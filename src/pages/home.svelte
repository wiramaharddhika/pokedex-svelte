<script>
  import { Link } from 'svelte-routing'
  import InfiniteLoading from 'svelte-infinite-loading'
  import PokemonCard from 'components/pokemon-card.svelte'

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
  <ul class="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
    {#each [...Array(total).keys()] as id}
      <li>
        <Link to={`/${id + 1}`}>
          <PokemonCard id={id + 1} />
        </Link>
      </li>
    {/each}
    <InfiniteLoading on:infinite={onInfinite} />
  </ul>
</div>
