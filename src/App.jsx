import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import ModalNuevoGasto from "./components/ModalNuevoGasto.jsx";
import ListadoGastos from "./components/ListadoGastos.jsx";
import Filtros from "./components/Filtros.jsx";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [gastoEditar, setGastoEditar] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      execModalAnimation();
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true);
    }
  },[])

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(g => g.tipoGasto == filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  const execModalAnimation = () => {
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };
  const handleNuevoGasto = () => {
    setGastoEditar([]);
    setModal(true);

    execModalAnimation();
  };

  const guardarGasto = (gastoObj) => {
    setGastos([...gastos, gastoObj]);
    setGastoEditar({});
  };

  const editarGasto = (gasto) => {
    const gastosEdit = gastos.map((g) => (g.id === gasto.id ? gasto : g));
    setGastos(gastosEdit);
  };

  const eliminarGasto = (gasto) => {
    const gastosEdit = gastos.filter((g) => g.id !== gasto.id);
    setGastos(gastosEdit);
  };



  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <ModalNuevoGasto
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          editarGasto={editarGasto}
        />
      )}
    </div>
  );
}

export default App;
