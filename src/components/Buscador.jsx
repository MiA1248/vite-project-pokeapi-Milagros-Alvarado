import React from "react";

const Buscador = ({ busqueda, setBusqueda, buscarPokemon }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand">POKEDEX</a>
        <form className='container-buscar d-flex justify-content-center' onSubmit={buscarPokemon}>
          <input
            type="text"
            placeholder='Encuentra tu pokemon'
            className='input-buscar form-control-lg'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className='btn-buscar btn btn-primary btn-lg' type='submit'>
            Buscar pokemon
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Buscador;
