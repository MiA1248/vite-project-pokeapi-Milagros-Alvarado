import React from "react";
//muestra los detalles de un Pokémon en un modal/popup.
function DetallePokemon({ mostrar, pokemon, cerrar }) {
  return (
    <div className={`modal ${mostrar ? "show" : ""}`} tabIndex="-1" style={{ display: mostrar ? "block" : "none" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close" onClick={cerrar}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 imagen-container ">
                <img src={pokemon.imagen} alt={pokemon.nombre} className="imagen-detalle img-fluid w-100 mx-auto" />
                <div  className="text-center">
                  {pokemon.types?.map((type) => (
                    <span key={type} className="badge bg-primary tag ">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-md-6 data">
                <h2 className="titulo text-center">{pokemon.nombre} ({pokemon.id})</h2>
                <h3 className="titulo-seccion text-center">Habilidades</h3>
                <div  className="text-center"> 
                  {pokemon.abilities?.map((ability) => (
                    <span key={ability} className="badge bg-success tag text-center">
                      {ability}
                    </span>
                  ))}
                </div>
                <h3 className="titulo-seccion text-center">Estadisticas</h3>
                <div className="stats">
                  {pokemon.stats?.map((stat) => (
                    <section key={stat.name} className="text-center">
                      <span className="badge bg-dark puntos">{stat.base}</span>
                      <span className="d-block">{stat.name}</span>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePokemon;