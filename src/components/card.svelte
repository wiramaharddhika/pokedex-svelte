<script>
  import Badge from 'components/badge.svelte'

  export let id
  export let name
  export let imageUrl
  export let types = []
</script>

<div class="Card">
  <img class="Card-image" src={imageUrl} alt="pokemon" />
  <h2 class="Card-name">{name}</h2>
  <h3 class="Card-id">#{id}</h3>
  <div class="Card-type">
    {#each types as type}
      <Badge class="Card-type" name={type} />
    {/each}
  </div>
</div>

<style>
  .Card {
  }
</style>
