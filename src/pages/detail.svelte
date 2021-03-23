<script>
  import { onMount } from 'svelte'
  import FastAverageColor from 'fast-average-color'
  import { Radar } from 'svelte-chartjs'
  import { pokemonList } from 'stores/pokemon.store'
  import PokemonCard from 'components/pokemon-card.svelte'
  import {
    fetchPokemonDetail,
    fetchPokemonEvolutionChain,
  } from 'utils/api.util'

  export let idOrName

  let pokemon
  let style

  $: radarData = pokemon && {
    labels: pokemon.stats.map((stat) =>
      stat.name.toUpperCase().split('-').join(' ')
    ),
    datasets: [
      {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: '1',
        pointRadius: '2',
        data: pokemon.stats.map((stat) => stat.value),
      },
    ],
  }

  const radarOptions = {
    legend: { display: false },
    scale: {
      ticks: {
        display: false,
        beginAtZero: true,
        max: 100,
        stepSize: 25,
      },
      angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
      gridLines: { color: 'rgba(255, 255, 255, 0.2)' },
      pointLabels: {
        fontColor: 'rgba(255, 255, 255, 0.5)',
        fontSize: '10',
      },
    },
    responsive: true,
  }

  onMount(async () => {
    if (!$pokemonList[idOrName]) {
      pokemon = await fetchPokemonDetail(idOrName)
    } else {
      pokemon = $pokemonList[idOrName]
    }

    if (!pokemon.evolutionChain) {
      pokemon.evolutionChain = await fetchPokemonEvolutionChain(idOrName)

      const id = Number(pokemon.id)
      const name = pokemon.name
      pokemonList.update((list) => ({
        ...list,
        [id]: pokemon,
        [name]: pokemon,
      }))
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
  <div class="Detail min-h-screen" {style}>
    <div class="container p-4">
      <div class="flex justify-center">
        <div class="Detail-name capitalize">{pokemon.name}</div>
        <div class="Detail-id">#{pokemon.id}</div>
      </div>
      <div class="relative mb-16">
        <div>
          <img
            class="Detail-image w-9/12 max-w-lg"
            on:load={onImageLoad}
            crossOrigin="anonymous"
            src={pokemon.image}
            alt="pokemon"
          />
        </div>
        <div class="absolute top-0 left-14 sm:left-32 z-0 w-full max-w-xl">
          {#if !!radarData}
            <Radar data={radarData} options={radarOptions} />
          {/if}
        </div>
      </div>
      {#if !!pokemon.evolutionChain}
        <div class="Detail-evolution p-4 rounded">
          <div class="flex justify-center items-center flex-col md:flex-row">
            {#each pokemon.evolutionChain as evolutionName, index}
              {#if index !== 0}
                <img
                  class="w-12 h-12 m-8 my-12 transform rotate-90 md:rotate-0"
                  src="/images/chevron-right.png"
                  alt="chevron-icon"
                />
              {/if}
              <div class="Detail-evolutionItem w-64">
                <PokemonCard idOrName={evolutionName} />
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .Detail-evolution {
    background-color: rgba(0, 0, 0, 0.1);
    width: min-content;
    margin: 0 auto;
  }
</style>
