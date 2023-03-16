// validate.js
export function validateForm(data) {
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