import { useEffect, useState } from 'react'
//Esta constante almacena la URL base para obtener la lista de los primeros 50 pokémons
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
//Esta constante almacena la URL base para acceder a información detallada de un pokémon en específico. Se utilizará esta URL para realizar búsquedas de pokémon por su nombre.
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'
function usePokemones() {
  const [pokemones, setPokemones] = useState([])
  const [siguienteUrl, setSiguienteUrl] = useState('')
  const [verMas, setVerMas] = useState(true)

  const fetchPokemon = async (url) => {
    const response = await fetch(url)
    const poke = await response.json()

    return {
      id: poke.id, // Obtiene el ID del Pokémon
      nombre: poke.name, // Obtiene el nombre del Pokémon
      imagen: poke.sprites.other.dream_world.front_default || poke.sprites.front_default, // Obtiene URL de la imagen del Pokémon
      abilities: poke.abilities.map(habilidadesobj => habilidadesobj.ability.name), // Obtiene las habilidades del Pokémon y las convierte en un array de nombres de habilidades
      stats: poke.stats.map(startobjet => ({ name: startobjet.stat.name, base:  startobjet.base_stat })), // Obtiene las estadísticas del Pokémon y las convierte en un array de objetos con nombres de estadísticas y valores base
      types: poke.types.map(typeobjet => typeobjet.type.name), // Obtiene los tipos del Pokémon y los convierte en un array de nombres de tipos
    };
    
  }
// obtiene la lista de pokémons a partir de una URL
  const getPokemones = async (url = URL_DEFAULT) => {
    const response = await fetch(url)
    const { next, results } = await response.json()
 // Utiliza Promise.all para realizar múltiples peticiones en paralelo para obtener los detalles de cada pokémon
    const newPokemones = await Promise.all(results.map(pokemon => fetchPokemon(pokemon.url)))

    return { next, newPokemones }
  }
//  carga los primeros 50 pokémons
  const obtenerPokemones = async () => {
    const { next, newPokemones } = await getPokemones()
    setPokemones(newPokemones)
    setSiguienteUrl(next)
  }
//carga más pokémons cuando se llega al final de la lista
  const masPokemones = async () => { 
    const { next, newPokemones } = await getPokemones(siguienteUrl)
    setPokemones(prev => [...prev, ...newPokemones])
    setVerMas(next !== null)
    setSiguienteUrl(next)
  }
  //busca pokémons por su nombre
  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
    return await fetchPokemon(url)
  }

  useEffect(() => { obtenerPokemones() }, [])

  return { pokemones, masPokemones, verMas, searchPokemon }
}

export default usePokemones