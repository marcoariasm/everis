import { ModalRejectModel } from '@aafp/commons/models';

export const ERROR_MESSAGES = {
  AFP0020: 'El correo electrónico ingresado ha sido utilizado en una solicitud de otro afiliado. Para continuar, debes ingresar otro correo electrónico.',
  AFP0021: 'El número de celular ingresado ha sido utilizado en una solicitud de otro afiliado. Para continuar, debes ingresar otro número de celular.',
  AFP0022: 'El número de cuenta ingresado ha sido utilizado en otra solicitud. Para continuar ingresa otro número de cuenta.',
  AFP3020: 'El documento de identidad o la fecha de nacimiento no se encuentran registradas.',
  AFP3021: `Los datos ingresados no son correctos o no se encuentra afiliado al SPP.<br>
    Para verificar si está afiliado accede <a href="https://www2.sbs.gob.pe/afiliados/paginas/consulta.aspx" target="_blank">aquí.</a><br>
    Si tus datos personales no son correctos, verifica con tu AFP.`,
  AFP3012: 'Según el cronograma establecido hoy no hay registros de solicitudes.',
  AFP3014: 'No accedes al retiro por no contar con saldo en tu cuenta.',
  AFP3015: 'No accedes al retiro por no cumplir con los requisitos establecidos por la Ley.',
  AFP3016: 'No accedes al retiro por el siguiente motivo: ',
  AFP3011: 'Ya cuentas con una solicitud registrada anteriormente.',
  AFP3013: 'Sí accedes al retiro. Ingresa tu solicitud en la fecha que te corresponde según el cronograma establecido.',
  'AFP3013-acessFlag-1': 'Sí accedes al retiro. Ingresa tu solicitud en la fecha que te corresponde según el cronograma establecido.',
  'AFP3013-acessFlag-2': 'Sí accedes al retiro. Ingresa tu solicitud en la fecha que te corresponde según el cronograma establecido.',
  'AFP3013-acessFlag-3': 'No accedes al retiro por no contar con saldo en tu cuenta.',
  'AFP3013-acessFlag-4': 'No accedes al retiro por no cumplir con los requisitos establecidos por la Ley.',
  'AFP3013-acessFlag-5': 'No accedes al retiro por el siguiente motivo: No Accedes a este Retiro. Calificas para realizar el Retiro Extraordinario por Jubilación Anticipada',
  AFP0002: new ModalRejectModel('NO_ACCESS_CALEDNAR'),
  AFP3003: 'Has superado el número máximo de intentos para identificarte. Podrás intentarlo el próximo día que te corresponda según el cronograma establecido.   Recuerda que suplantar la identidad de otra persona, aunque se trate de un familiar, es un delito.',
  AFP3004: 'No hemos podido validar tu identidad. Ingresa nuevamente tus datos para registrar tu solicitud.  <b>Luego del 3er intento fallido tu usuario será bloqueado.</b> Podrás intentar nuevamente el próximo día que te corresponda según el cronograma establecido. Recuerda que suplantar la identidad de otra persona, aunque se trate de un familiar, es un delito.',
  'AFP3003-1': 'Has superado el número máximo de intentos para identificarte. Podrás intentarlo nuevamente al día siguiente, según el cronograma establecido.  Recuerda que suplantar la identidad de otra persona, aunque se trate de un familiar, es un delito.',
  AFP3006: 'No hemos podido validar tu identidad. Ingresa nuevamente tus datos para registrar tu solicitud.  <b>Luego del 3er intento fallido tu usuario será bloqueado.</b> Podrás intentar nuevamente el próximo día que te corresponda según el cronograma establecido. Recuerda que suplantar la identidad de otra persona, aunque se trate de un familiar, es un delito.',
  AFP4007: 'No contamos con información de tu DNI para validar tu identidad, por favor, comunícate con tu AFP',
  AFP4009: 'No existen solicitudes asociadas para los datos ingresados en la consulta.',
  'AFP3031-6': 'Sí accedes al retiro de hasta 4 UIT. El monto máximo a retirar dependerá del saldo que tengas en tu cuenta.',
  'AFP3032-7': 'Sí accedes al retiro de hasta 1 UIT. El monto máximo a retirar dependerá del saldo que tengas en tu cuenta.',
  'AFP3033-8': 'Tu acceso al retiro dependerá si cumples o no con las condiciones de acceso al REJA. Esta evaluación se realizará con la información que nos brinde SUNAT respecto de tus ingresos de 4 categoría',
  'AFP3034-9': 'No accedes al retiro de tu fondo.',
  AFP500: 'Parámetros inválidos.',
  AFP501: 'No se encuentra información para el documento ingresado.',
  AFP502: 'No existe información para el documento ingresado.',
  AFP510: 'Error de comunicación con el servicio externo.',
  AFP511: 'Tiempo de espera excedido.',
  AFP401: 'No existe información para el documento ingresado.',
  AFP1001: 'El número de celular ingresado no se encuentra registrado a tu nombre. Puedes actualizarlo o continuar con tu solicitud.',
};
