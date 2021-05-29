import {Message} from '@angular/compiler/src/i18n/i18n_ast';

export type TypeAccesCode = 'LOWERTHAN_50_PERCENT'
  | 'GREATERTHAN_50_PERCENT'
  | 'NO_ACCESS_INSUFFICIENT_BALANCE'
  | 'NO_ACCESS_BY_CONTRIBUTIONS'
  | 'NO_ACCESS_OTHER'
  | 'NO_ACCESS_CALEDNAR'
  | 'USER_NOT_FOUND'
  | 'GENERIC_ERROR'
  | 'REQUEST_SUCCESS'
  | 'REQUEST_ALREADY_REGISTERED'
  | 'REQUEST_NOT_PROCESS'
  | 'NO_BANK_ACCOUNT'
  | 'NO_BANK_ACCOUNT_GROUP_B'
  | 'NO_BANK_ACCOUNT_GROUP_NONE_PROFUTURO'
  | 'NO_BANK_ACCOUNT_GROUP_NONE'
  | 'REQUEST_EXPIRY'
  | 'WITH_BANK_ACCOUNT'
  | 'HELP_VERIFY_BANK_ACCOUNT'
  | 'ZERO_AMOUNT_2K'
  | 'ZERO_AMOUNT_25_PERCENT'
  | 'ERROR_NATION_BANK_DIGIT'
  | 'ERROR_IDENTIFICATION'
  | 'BANK_ACCOUNT_NUMBER_ALREADY_REGISTERED'
  | 'EMAIL_ALREADY_REGISTERED'
  | 'CELLPHONE_ALREADY_REGISTERED'
  | 'DNI_BLOCKED'
  | 'DNI_ALLOWED_TRANSACTIONS'
  | 'DNI_EXCEEDED_TRANSACTIONS_PER_DAY'
  | 'BANK_MSG'
  | 'BANKS_MSG_ADDITIONAL'
  | 'BANK_NATION';

export const MESSAGES = {
  NO_ACCESS_CALEDNAR: 'Hoy no te corresponde ingresar tu solicitud de retiro. Por favor, verifica en el cronograma el día que debes ingresar tu solicitud.',
  USER_NOT_FOUND: 'Alguno de los datos registrados no es correcto o no te encuentras afiliado a una AFP. Para más información ingresa a',
  NO_ACCESS_INSUFFICIENT_BALANCE: 'No accedes al retiro por no contar con saldo en tu cuenta.',
  NO_ACCESS_BY_CONTRIBUTIONS: 'No accedes al retiro porque tu AFP aún no recibe tu solicitud de Suspensión Perfecta de Labores aprobada por parte del Ministerio de Trabajo y Promoción del Empleo.',
  // tslint:disable-next-line:max-line-length
  NO_ACCESS_OTHER: 'No accedes al retiro por no cumplir con los requisitos que señala el D.U. N°038-2020. Por favor, comunícate con tu AFP.',
  GENERIC_ERROR: 'En este momento no podemos atender tu solicitud. Por favor, inténtalo nuevamente en unos minutos. Gracias.',
  REQUEST_SUCCESS: 'Se ha enviado la solicitud de retiro N° XXX el día XXX a las XXX horas. Gracias.',
  REQUEST_ALREADY_REGISTERED: 'Ya tienes una solicitud de retiro N° XXX registrada el día XXX a las XXX horas. Gracias.',
  REQUEST_NOT_PROCESS: 'Tu solicitud no se registró correctamente. Por favor, inténtalo nuevamente.',
  NO_BANK_ACCOUNT: `Si no tienes cuenta bancaria, conforme al D.U. N° 056-2020, tu AFP podrá abrir una cuenta en alguna entidad financiera en la
  cual depositará el monto de tu retiro.
  <br>Tu AFP se contactará contigo en los próximos días, a través de un correo y/o SMS, para indicarte la fecha
  y el medio por el que se realizará el pago o cualquier observación que hubiera.
  <br><br>Por favor, continúa completando tus datos y da clic en Registrar solicitud.`,
  NO_BANK_ACCOUNT_GROUP_B: `Conforme al D.U. N 056-2020, elige el banco en el que deseas que la AFP solicite la apertura de una cuenta a tu nombre. En dicha
  cuenta se abonará tu retiro. Asegúrate de poder acercarte a una de sus agencias, ya que no será posible pedir el cambio de forma de pago.
  <br><br>Si no estás de acuerdo, te sugerimos abrir una cuenta online en alguna de las entidades con las que trabajamos, antes de registrar tu solicitud.`,
  NO_BANK_ACCOUNT_GROUP_NONE_PROFUTURO: `No se han encontrado entidades bancarias en tu distrito. Para que puedas disponer del monto de tu retiro, es necesario que
  abras una cuenta online o en alguna de las agencias de las entidades con las que trabajamos, antes de registrar tu solicitud.`,
  NO_BANK_ACCOUNT_GROUP_NONE: `Conforme al D.U. N 056-2020, elige el banco en el que deseas que la AFP solicite la apertura de una cuenta a tu nombre. En dicha cuenta se abonará tu retiro.
  <br><br>Ten en cuenta que <u>en tu distrito no hay agencias de estos bancos</u>, si eliges uno de ellos, asegúrate de poder acercarte a una de sus agencias, ya que no será posible pedir el cambio de forma de pago.
  <br><br>Si no estás de acuerdo, te sugerimos abrir una cuenta online en alguna de las entidades con las que trabajamos, antes de registrar tu solicitud.`,
  REQUEST_EXPIRY: 'Tu sesión ha expirado.',
  WITH_BANK_ACCOUNT: `La cuenta debe estar activa a nombre del afiliado, ser en soles y unipersonal (no
  mancomunada). De no cumplir con alguna de las condiciones, tu AFP se contactará contigo
  en los próximos días para indicarte como te realizará el pago.
  <br><br>Si tu cuenta es del <strong>BCP</strong> o del <strong>Banco de la Nación</strong>, debe estar libre de cualquier
  orden de embargo vigente y/o cobro pendiente por cualquier otro concepto.
  En los casos en los que se identifique que la cuenta que ingresaste está afecta a
  este tipo de cobros, el dinero tendrá que ser retirado en efectivo de la agencia
  o banco que te informará la AFP.`,
  HELP_VERIFY_BANK_ACCOUNT: 'Tómate un tiempo para revisar el número de tu cuenta.',
  ZERO_AMOUNT_2K: 'No accedes al retiro por no contar con saldo en tu cuenta de aportes obligatorios.',
  ZERO_AMOUNT_25_PERCENT: 'No accedes al retiro por no contar con saldo en tu cuenta de aportes obligatorios.',
  ERROR_NATION_BANK_DIGIT: 'El número de cuenta bancaria debe empezar con el dígito <strong>4</strong>.',
  ERROR_IDENTIFICATION: 'Usted no respondio las preguntas correctemente. No se pudo identificar.',
  BANK_ACCOUNT_NUMBER_ALREADY_REGISTERED: 'Error: El número de cuenta bancaria fue registrada en una solicitud de retiro anterior. Debes utilizar una cuenta bancaria distinta.',
  EMAIL_ALREADY_REGISTERED: 'Error: El correo electrónico fue registrado en una solicitud de retiro anterior. Debes utilizar un correo electrónico distinto.',
  CELLPHONE_ALREADY_REGISTERED: 'Error: El número de teléfono fue registrado en una solicitud de retiro anterior. Debes utilizar un número de teléfono distinto.',
  DNI_BLOCKED: 'EL DNI HA SIDO BLOQUEADO POR SUPERAR LA CANTIDAD MAXIMA DE INTENTOS FALLIDOS.',
  DNI_ALLOWED_TRANSACTIONS: 'El DNI puede acceder un máximo de 3 de veces al día al servicio de validación de EQUIFAX.',
  DNI_EXCEEDED_TRANSACTIONS_PER_DAY: 'POR SEGURIDAD DE SU IDENTIDAD, NO SE PERMITE REALIZAR MÁS INTENTOS DE CUESTIONARIO. INTÉNTELO NUEVAMENTE A PARTIR DE MAÑANA',
  BANK_MSG: `Tu banco abrirá una cuenta a tu nombre para depositar el monto de tu retiro. Asegúrate de mantenerla activa hasta recibir el total de tu retiro, incluyendo la segunda armada, si te corresponde.`,
  BANKS_MSG_ADDITIONAL: 'Tu banco abrirá una cuenta a tu nombre para depositar el monto de tu retiro. Asegúrate de mantenerla activa hasta recibir el total de tu retiro, incluyendo la segunda armada, si te corresponde.<br><br>Si tu documento no es DNI, por ahora, el banco no podrá abrir una cuenta intangible para depositar tu retiro.<br><br>Tu solicitud no será procesada.',
  BANK_NATION: `Tu cuenta podría estar afecta al cobro de Seguros, entre ellos, de Protección de Tarjeta (S/1.52), Oncológico (hasta S/68.41) o de Sepelio (hasta S/9.90).
  Para mayor información consultar la página web del Banco.
  `,
  QUERY_GENERIC_ERROR: 'En este momento no podemos realizar tu consulta o transacción. Asegúrate de estar dentro del horario de atención <b>(de lunes a viernes de 8:00am a 8:00pm)</b>. Si estás dentro del horario de atención, por favor, inténtalo nuevamente en unos minutos.'
};


export class ModalRejectModel {
  title: string;
  content: string;
  reset: boolean;
  openOtherModal: boolean;
  textButton: string;
  callback: () => void;

  constructor(
    accessCode: TypeAccesCode | string,
    title = 'Notificacion',
    data: string[] = [],
    reset = false,
    openOtherModal = false,
    textButton?: string,
    callback?: () => void
  ) {
    this.content = MESSAGES[accessCode] ? this.prepareText(MESSAGES[accessCode], data) : accessCode;
    this.title = title;
    this.reset = reset;
    this.openOtherModal = openOtherModal;
    this.textButton = textButton;
    this.callback = callback;
  }

  prepareText(text, param: string[]) {
    param.forEach((value) => {
      text = text.replace('XXX', value);
    });
    return text;
  }
}
