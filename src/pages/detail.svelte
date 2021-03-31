<script>
  import { onMount } from 'svelte'
  import FastAverageColor from 'fast-average-color'
  import { Radar } from 'svelte-chartjs'
  import { pokemonList } from 'stores/pokemon.store'
  import PokemonCard from 'components/pokemon-card.svelte'
  import PokemonTypeBadge from 'components/pokemon-type-badge.svelte'
  import {
    fetchPokemonDetail,
    fetchPokemonEvolutionChain,
  } from 'utils/api.util'

  export let idOrName

  let pokemon
  let style

  $: radarData = pokemon && {
    labels: pokemon.stats.map((stat) => stat.name.toUpperCase()),
    datasets: [
      {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderColor: 'rgba(255, 255, 255, 0.6)',
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
        max: 256,
        stepSize: 64,
      },
      angleLines: { color: 'rgba(255, 255, 255, 0.6)' },
      gridLines: { color: 'rgba(255, 255, 255, 0.8)' },
      pointLabels: {
        fontColor: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14',
      },
    },
  }

  onMount(async () => {
    window.scrollTo(0, 0)

    if (!$pokemonList[idOrName]) {
      pokemon = await fetchPokemonDetail(idOrName)
    } else {
      pokemon = $pokemonList[idOrName]
    }

    if (!pokemon.evolutionChain) {
      pokemon.evolutionChain = await fetchPokemonEvolutionChain(idOrName)
    }

    const id = Number(pokemon.id)
    const name = pokemon.name
    pokemonList.update((list) => ({
      ...list,
      [id]: pokemon,
      [name]: pokemon,
    }))
  })

  const onImageLoad = () => {
    const image = document.querySelector('.Detail-image')
    const fastAverageColor = new FastAverageColor()
    const color = fastAverageColor.getColor(image).hex
    style = `background-color: ${color}`
  }
</script>

{#if !!pokemon}
  <div class="Detail min-h-screen md:py-16" {style}>
    <div class="container p-4">
      <div class="grid gap-6 grid-cols-1 md:grid-cols-3 mb-16">
        <div>
          <div
            class="Detail-name capitalize text-5xl font-semibold text-white text-shadow"
          >
            {pokemon.name}
          </div>
          <div class="mt-32 relative">
            <div class="Detail-ability capitalize text-white text-shadow">
              <span class="font-semibold">Ability: </span>{pokemon.abilities[0]}
            </div>
            <div class="Detail-size ml-24">
              <div class="text-white text-shadow">
                <span class="font-semibold">Height: </span>{pokemon.height}m
              </div>
              <div class="text-white text-shadow">
                <span class="font-semibold">Weight: </span>{pokemon.weight}kg
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <img
            class="Detail-image w-full"
            on:load={onImageLoad}
            crossOrigin="anonymous"
            src={pokemon.image}
            alt="pokemon"
          />
          <div
            class="Detail-id absolute bottom-0 left-0 text-white text-7xl font-bold opacity-70"
          >
            #{pokemon.id}
          </div>
        </div>
        <div>
          <div class="flex justify-center mt-12">
            {#if !!pokemon.evolutionChain && !!radarData}
              <Radar
                data={radarData}
                options={radarOptions}
                width={400}
                height={400}
              />
            {/if}
          </div>
          <div class="flex justify-start">
            {#each pokemon.types as type}
              <PokemonTypeBadge {type} size={16} />
            {/each}
          </div>
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

  .Detail-ability {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(-90deg) translate(40%, -200%);
  }
</style>
