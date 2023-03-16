function validarFormulario(data) {
  const errores = [];

  if (!data.nombre.trim()) {
    errores.push('El campo Nombre es obligatorio.');
  }

  if (!data.email.trim()) {
    errores.push('El campo E-mail es obligatorio.');
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
    errores.push('El campo E-mail tiene un formato inválido.');
  }

  if (!data.telefono.trim()) {
    errores.push('El campo Teléfono es obligatorio.');
  } else if (/d{8}$/.test(data.telefono)) {
    errores.push('El campo Teléfono debe ser un número que comience con ');
  }

  if (!data.mensaje.trim()) {
    errores.push('El campo Mensaje es obligatorio.');
  }

  if (!data.opciones || data.opciones === '-- Seleccione --') {
    errores.push('Debes seleccionar una opción en Vende o Compra.');
  }

  if (data.contacto && data.contacto === 'telefono' && (!data.fecha || !data.hora)) {
    errores.push('Debes seleccionar una fecha y hora para ser contactado por teléfono.');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('.contacto');
  const cantidad = document.querySelector('input[type="number"]');

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const contacto = document.querySelector('input[name="contacto"]:checked');
    const data = {
      nombre: formulario.nombre.value,
      email: formulario.email.value,
      telefono: formulario.telefono.value,
      mensaje: formulario.mensaje.value,
      opciones: formulario.opciones.value,
      cantidad: cantidad ? cantidad.value : null, // Verificar si 'cantidad' existe antes de acceder a su valor
      contacto: contacto ? contacto.value : null, 
      fecha: formulario.fecha.value,
      hora: formulario.hora.value,
    };

    const { valido, errores } = validarFormulario(data);

    const mensajeExito = document.getElementById('mensaje-exito');

    if (!valido) {
      // Ocultar el mensaje de éxito si está visible
      mensajeExito.style.display = 'none';
      alert('Errores:\n\n' + errores.join('\n'));
    } else {
      // Mostrar el div del mensaje de éxito
      mensajeExito.style.display = 'block';
    
    }
  });
});
