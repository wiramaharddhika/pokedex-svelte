<script>
  import { pokemonTypeColor } from 'constants/color.constant'

  export let type
  export let size = 9

  const style = `background-color: ${pokemonTypeColor[type]};`
</script>

<img
  class={`PokemonTypeBadge p-2 ml-2 h-${size} w-${size} rounded-full shadow`}
  alt="pokemon type"
  src={`images/${type}.svg`}
  {style}
/>
