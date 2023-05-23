import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  gastoEditar,
  setGastoEditar,
  eliminarGasto,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      
      {filtro ? (
        <>
      <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos"}</h2>
            {gastosFiltrados.map((gasto) => {
            return (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      ) : (
        <>
        <h2>{gastos.length ? "Gastos" : "No hay gastos"}</h2>
        {gastos.map((gasto) => {
          return (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          );
        })
    }
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
