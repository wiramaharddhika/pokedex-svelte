<script>
  import { onMount } from 'svelte'
  import FastAverageColor from 'fast-average-color'
  import { Radar } from 'svelte-chartjs'
  import { pokemonList } from 'stores/pokemon.store'
  import { fetchPokemonDetail } from 'utils/api.util'

  export let id

  let pokemon
  let style

  $: radarData = pokemon && {
    labels: pokemon.stats.map((stat) => stat.name.toUpperCase()),
    datasets: [
      {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        data: pokemon.stats.map((stat) => stat.value),
      },
    ],
  }

  const radarOptions = {
    legend: { display: false },
    plugin: { datalabels: { display: 'none' } },
    responsive: true,
  }

  onMount(async () => {
    if (!$pokemonList[id]) {
      pokemon = await fetchPokemonDetail(id)
      pokemonList.update((list) => ({ ...list, [id]: pokemon }))
    } else {
      pokemon = $pokemonList[id]
    }
  })

  const onImageLoad = () => {
    const image = document.querySelector('.Detail-image')
    const fastAverageColor = new FastAverageColor()
    const color = fastAverageColor.getColor(image).hex
    style = `background-color: ${color}`
  }
</script>

{#if !!pokemon}
  <div class="Detail" {style}>
    <div class="container">
      <div class="flex justify-center">
        <div class="Detail-name capitalize">{pokemon.name}</div>
        <div class="Detail-id">#{pokemon.id}</div>
      </div>
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div>
          <img
            class="Detail-image"
            on:load={onImageLoad}
            crossOrigin="anonymous"
            src={pokemon.image}
            alt="pokemon"
          />
        </div>
        <div>
          {#if !!radarData}
            <Radar data={radarData} options={radarOptions} />
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
