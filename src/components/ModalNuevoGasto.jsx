import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import ErrorMessage from "./ErrorMessage";
import { generarId } from "../helpers";

const ModalNuevoGasto = ({ 
    setModal, 
    animarModal, 
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
    editarGasto }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipoGasto, setTipoGasto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editMode,setEditMode] = useState(false)

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setTipoGasto(gastoEditar.tipoGasto)
        setCantidad(gastoEditar.cantidad)

        setEditMode(true)
    }
  },[])

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ([nombre, cantidad, tipoGasto].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje('')
      },3000)
      return;
    }

    const objGastos = {
        fecha: Date.now(),
        nombre,
        cantidad,
        tipoGasto
    }    
    
    if(!editMode){
       objGastos.id = generarId()        
    
        guardarGasto(objGastos)
        
    }else{
        objGastos.id = gastoEditar.id
        editarGasto(objGastos)
    }
    ocultarModal()

  };

  return (
    <div className="modal" style={{ overflow: "auto" }}>
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{editMode ? "Editar Gasto" : "Nuevo Gasto" }</legend>

        {
            mensaje &&
            <ErrorMessage tipo="error">{mensaje}</ErrorMessage>
        }
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>

          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: ej. 5000"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select
            id="categoria"
            value={tipoGasto}
            onChange={(e) => setTipoGasto(e.target.value)}
          >
            <option value="">Seleccione Categoría...</option>

            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={editMode ? "Editar Gasto"  : "Guardar Gasto"} />
      </form>
      <div></div>
    </div>
  );
};

export default ModalNuevoGasto;
