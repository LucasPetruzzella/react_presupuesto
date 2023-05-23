const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

const parseFecha = (fecha) => {    const opciones = {
        year:'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fecha.toLocaleDateString('es-ES',opciones)
}

const formatearCantidad = (cantidad) => {
    
    const cantidadParsed = Number(cantidad).toLocaleString("es-AR", {
      style: "currency",
      currency: "CLP",
    });

    return cantidadParsed;
  };

  export {
    generarId,
    parseFecha,
    formatearCantidad
  }