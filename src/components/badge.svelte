<script>
  export let name
  export let color

  const style = {
    'background-color': color,
  }
</script>

<span class="Badge" {style}>{name}</span>

<style>
  .Badge {
    border-radius: 3px;
    max-width: 110px;
    font-size: 11px;
  }
</style>
