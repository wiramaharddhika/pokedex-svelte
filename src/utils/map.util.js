export const mapPokemonDetail = (pokemon) => {
  return {
    id: pokemon.id.toString().padStart(3, '0'),
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    types: pokemon.types.map((type) => type.type.name),
    stats: pokemon.stats.map((stat) => {
      const nameMap = {
        hp: 'hp',
        attack: 'att',
        defense: 'def',
        speed: 'spd',
        'special-attack': 'sp. att',
        'special-defense': 'sp. def',
      }

      return {
        name: nameMap[stat.stat.name],
        value: stat.base_stat,
      }
    }),
    abilities: pokemon.abilities.map((ability) =>
      ability.ability.name.split('-').join(' ')
    ),
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
  }
}
