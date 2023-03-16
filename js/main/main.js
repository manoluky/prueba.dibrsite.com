// main.js
const { validateForm } = require('./validate.js');

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

    const { valido, errores } = validateForm(data);

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
