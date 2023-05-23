import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [mensaje, setMensaje] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
      
        if(isNaN(presupuesto) || Number(presupuesto) <= 0){
          setMensaje("El valor debe ser numérico y mayor a 0")
          return
        }else{
            setMensaje("")
        }
      
        setIsValidPresupuesto(true)
      };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={onSubmit} className="formulario">
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
          />
        </div>

        <input type="submit" value="Añadir" />

        { mensaje && <ErrorMessage tipo="error">{mensaje}</ErrorMessage> }
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
