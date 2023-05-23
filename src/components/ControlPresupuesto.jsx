import React, { useEffect, useState } from "react";
import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalParcial = gastos.reduce((total, gasto) => {
      return gasto.cantidad + total;
    }, 0);

    setGastado(totalParcial);
    setDisponible(presupuesto - totalParcial);

    setTimeout(() => {
      setPorcentaje(((totalParcial / presupuesto) * 100).toFixed(2));
    }, 800);
  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm(
      "¿Desea reiniciar el control de presupuesto y gastos?"
    );

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>
          <CircularProgressbar
            value={porcentaje}
            text={`${porcentaje}% gastado`}
            styles={buildStyles({
              pathColor: porcentaje > 100 ? "red" : "#3B82F6",
              trailColor: "#F5F5F5",
              textColor: "#3B82F6",
            })}
          />
        </p>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          {" "}
          Resetear App
        </button>
        <p>
          <span>Presupuesto: {formatearCantidad(presupuesto)}</span>
        </p>
        <p>
          <span>Gastado: {formatearCantidad(gastado)}</span>
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: {formatearCantidad(disponible)}</span>
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
