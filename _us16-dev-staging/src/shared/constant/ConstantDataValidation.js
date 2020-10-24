export const textDataValidation = {
  title: 'Validación de datos',
  subtitle:
    ' Es importante que contemos con tus datos actualizados, tal como figuran en tu DNI. Por favor verifica la información que tenemos registrada en nuestra base de datos:',
  updateUrl: 'https://www.prima.com.pe',
  targetBlank: '_blank',
  titleBasicInfo: '1. Datos Personales',
  titleContactInfo: '2. Datos de contacto',
  textFailDate: '¿Tus datos no son correctos?',
  textUpdateData: 'Actualizar datos',
  infoBeneficiary: {
    landline: 'Teléfono fijo',
    mobilePhone: 'Teléfono móvil',
    mail: 'Correo electrónico',
    noInfo: '---',
  },
  beneficiary: [
    {
      name: 'surname',
      value: 'Apellido paterno',
    },
    {
      name: 'motherSurname',
      value: 'Apellido materno',
    },

    {
      name: 'firstName',
      value: 'Primer nombre',
    },

    {
      name: 'secondName',
      value: 'Segundo nombre',
    },
    {
      name: 'documentType',
      value: 'Tipo de documento',
    },

    {
      name: 'documentNumber',
      value: 'N˚ de documento',
    },
    {
      name: 'birthdate',
      value: 'Fecha de nacimiento',
    },
    {
      name: 'gender',
      value: 'Sexo',
    },
    {
      name: 'maritalStatus',
      value: 'Estado civil',
    },
  ],
  modalUpdate: {
    tramite: '“Jubilación y/o retiro de hasta el 95.5%”',
    title: 'Si modificas alguno de tus datos personales, estos se verán reflejados en un plazo de 48 horas.',
    text: ' Luego de que actualices tus datos ingresa nuevamente a la opción ',
    text1: ' para que puedas continuar con el trámite.',
  },
}
