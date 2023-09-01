import usePokemones from '../hooks/consumirapi'
import InfiniteScroll from 'react-infinite-scroll-component'
import DetallePokemon from './popuppokemons'
import Buscador from './Buscador'
import { useState } from 'react'

function Pokemon({ id, nombre, imagen, verPokemon }) {
  return (
<div className='col-4 col-md-2'>
      <div className='card p-2 h-100 d-flex flex-column justify-content-between pokemon-card' onClick={verPokemon}>
        <img src={imagen} alt={nombre} className='pokemon-imagen img-fluid w-100' />
        <p className='pokemon-titulo'>
          <span>#{id}</span>
          <span>{nombre}</span>
        </p>
      </div>
    </div>
  )
}

function Pokemones() {

  const { pokemones, masPokemones, verMas, searchPokemon } = usePokemones()
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} })
  const [busqueda, setBusqueda] = useState('')

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon })

  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {}})
    setBusqueda('')
  }

  const buscarPokemon = async (e) => {
    e.preventDefault()

    if (!busqueda) return

    const pokemon = await searchPokemon(busqueda)
    console.log(pokemon);
    setMostrar({ mostrar: true, pokemon })
  }
  
  return (
    <div className='container-fluid'>
      <DetallePokemon {...mostrar} cerrar={noVerPokemon}/>
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
      <div className='row'>
        <InfiniteScroll
          dataLength={pokemones.length}
          next={masPokemones}
          hasMore={verMas}
          endMessage={
            <h3 className='col-12 text-center mt-4'>Lo siento, no hay más pokemones por mostrar</h3>
          }
        >
          <div className='container'>
            <div className='row'>
              {pokemones.map(pokemon => (
                <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)}/>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Pokemones

