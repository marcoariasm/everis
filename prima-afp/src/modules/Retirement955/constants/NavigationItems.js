const HOLDING_NAV_MESSAGE =
  'No has culminado la Etapa 1 del trámite, si sales se perderá toda la información que has registrado';

export default [
  {
    text: 'Inicio',
    pathLink: '/inicio',
    holdContent: {
      content: HOLDING_NAV_MESSAGE
    },
  },
  {
    text: 'Nueva solicitud de trámite',
    icon: null,
    iconActive: null,
    path: '/proceso95-5',
    pathLink: '/inicio/nueva-solicitud/afiliado',
    holdContent: {
      content: HOLDING_NAV_MESSAGE
    },
  },
  {
    text: 'Estado de mis trámites',
    icon: null,
    iconActive: null,
    path: null,
    pathLink: '/detalles-tramite',
    holdContent: {
      content: HOLDING_NAV_MESSAGE
    },
  },
]