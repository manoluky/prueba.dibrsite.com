const { validateForm } = require('../main/validate.js');

describe('validateForm', () => {
  test('Debería devolver un objeto con la propiedad "valido" igual a true si todos los campos son válidos', () => {
    const data = {
      nombre: 'John Doe',
      email: 'johndoe@example.com',
      telefono: '+56912345678',
      mensaje: 'Hola, me gustaría obtener más información.',
      opciones: 'Compra',
      cantidad: 10,
      contacto: 'telefono',
      fecha: '2023-04-01',
      hora: '15:00',
    };

    const { valido } = validateForm(data);
    expect(valido).toBe(true);
  });

  test('Debería devolver un objeto con la propiedad "valido" igual a false si el correo electrónico no es válido', () => {
    const data = {
      nombre: 'John Doe',
      email: 'johndoe@example', // Dirección de correo electrónico incorrecta
      telefono: '+56912345678',
      mensaje: 'Hola, me gustaría obtener más información.',
      opciones: 'Compra',
      cantidad: 10,
      contacto: 'telefono',
      fecha: '2023-04-01',
      hora: '15:00',
    };

    const { valido } = validateForm(data);
    expect(valido).toBe(false);
  });

  // Agrega más pruebas para los demás campos y casos de uso
});