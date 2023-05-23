import React from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import {parseFecha, formatearCantidad} from '../helpers' 
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const Gasto = ({ gasto,setGastoEditar, eliminarGasto  }) => {
    const CATEGORIA_IMAGEN = {
        "ahorro" : IconoAhorro,
        "casa" : IconoCasa,
        "comida" : IconoComida,
        "gastos" : IconoGastos,
        "ocio" : IconoOcio,
        "salud" : IconoSalud,
        "suscripciones" : IconoSuscripciones
    }


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {setGastoEditar(gasto)}}>Editar</SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
        <SwipeAction 
            onClick={() => {eliminarGasto(gasto)}}
            destructive={true}>Eliminar</SwipeAction>
    </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
    <div className="gasto sombra">
      <div className="contenido-gasto">
        <img src={CATEGORIA_IMAGEN[gasto.tipoGasto]}/>
        <div className="descripcion-gasto">
          <p className="categoria"> {gasto.tipoGasto}</p>
          <p className="nombre-gasto">{gasto.nombre}</p>
          <p className="fecha-gasto">{parseFecha(new Date(gasto.fecha))}</p>
          <small>{"<- Arrastre para Derecha o Izquierda para más acciones ->" }</small>
        </div>
      </div>
      <div className="cantidad-gasto">{formatearCantidad(gasto.cantidad)} </div>

    </div>
    </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
