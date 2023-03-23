
const assert = require('assert');
const { validarFormulario, init } = require('../main/validate.js');
const { JSDOM } = require('jsdom');
const { document } = (new JSDOM('')).window;

global.document = document;

describe('Validación de formulario', () => {

  let dom;

  beforeAll(() => {
    init(); // Invoca la función init() antes de realizar las pruebas

    dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>
    <form class="contacto" action="" id="contacto">
    <fieldset>
      <legend>Información Personal</legend>
      <label for="nombre">Nombre: </label>
      <input type="text" id="nombre" placeholder="Tu Nombre">

      <label for="email">E-mail: </label>
      <input type="email" id="email" placeholder="Tu Correo Electrónico" required>

      <label for="telefonoId">Teléfono</label>
      <input type="tel" id="telefonoId" placeholder="+569" required>

      <label for="mensaje">Mensaje: </label>
      <textarea id="mensaje" cols="60" rows="10"></textarea>

    </fieldset>

    <fieldset>

      <legend>Información Sobre Propiedad</legend>

      <label for="opciones">Vende o Compra</label>
      <select id="opciones">
        <option value="" disabled selected>-- Seleccione --</option>
        <option value="Compra">Compra</option>
        <option value="Vende">Vende</option>
      </select>
      <label for="cantidad">Cantidad</label>
      <input type="number" min="0" max="100" step="5">

    </fieldset>

    <fieldset>
      <legend>Contacto</legend>

      <p>Como desea ser contactado:</p>

      <div class"forma-contacto">
        <label for"telefono">Teléfono</label>
        <input type="radio" name="contacto" value="telefono" id="telefono">

        <label for="correo">E-mail</label>
        <input type="radio" name="contacto" value="correo" id="correo">
      </div>
      <p>Si eligió Teléfono, elija fecha y la hora</p>
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha">

      <label for="hora">Hora:</label>
      <input type="time" name="hora" min="09:00" max="18:00">

    </fieldset>

    <div id="errores"></div>
    
    <input type="submit" value="enviar" class="boton boton-verde">

    <div id="mensaje-exito" class="mensaje-exito" style="display: none;">
      Formulario enviado correctamente.
    </div>

  </form>
    </body></html>>`);
  });

  // Test 1
  it('debería devolver un objeto con la propiedad "valido" igual a true si todos los campos son válidos', () => {
    const data = {
      nombre: 'John Doe',
      email: 'john@example.com',
      telefono: '12345678',
      mensaje: 'Este es un mensaje de prueba.',
      opciones: 'Compra',
      contacto: 'correo',
      fecha: '2023-03-16',
      hora: '09:00'
    };

    const resultado = validarFormulario(data);

    assert.strictEqual(resultado.valido, true);
    assert.strictEqual(resultado.errores.length, 0);
  });

  // Test 2
  it('debería devolver un objeto con la propiedad "valido" igual a false si algunos campos están vacíos', () => {
    const data = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
      opciones: '-- Seleccione --',
      contacto: null,
      fecha: '',
      hora: ''
    };

    const resultado = validarFormulario(data);

    assert.strictEqual(resultado.valido, false);
    assert.strictEqual(resultado.errores.length, 5);
    assert.ok(resultado.errores.includes('El campo Nombre es obligatorio.'));
    assert.ok(resultado.errores.includes('El campo E-mail es obligatorio.'));
    assert.ok(resultado.errores.includes('El campo Teléfono es obligatorio.'));
    assert.ok(resultado.errores.includes('El campo Mensaje es obligatorio.'));
    assert.ok(resultado.errores.includes('Debes seleccionar una opción en Vende o Compra.'));
  });

  // Test 3
  it('debería devolver un objeto con la propiedad "valido" igual a false si el formato del correo electrónico es inválido', () => {
    const data = {
      nombre: 'John Doe',
      email: 'john@example',
      telefono: '12345678',
      mensaje: 'Este es un mensaje de prueba.',
      opciones: 'Compra',
      contacto: 'correo',
      fecha: '2023-03-16',
      hora: '09:00'
    };

    const resultado = validarFormulario(data);

    assert.strictEqual(resultado.valido, false);
    assert.strictEqual(resultado.errores.length, 1);
    assert.ok(resultado.errores.includes('El campo E-mail tiene un formato inválido.'));
  });

});
