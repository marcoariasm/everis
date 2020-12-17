import {
  QUERY,
  QUERY_PROCEDURE,
  SCHEDULE,
} from 'modules/Retirement955/constants';
import modules from 'modules/shared';
import AgendaIcon from '../../../shared/images/iconos/agenda.svg';
import AgendaWhiteIcon from '../../../shared/images/iconos/agenda-white.svg';
import DoubleFileIcon from '../../../shared/images/iconos/doublefile.svg';
import DoubleFileWhiteIcon from '../../../shared/images/iconos/doublefile-white.svg';

const { show } = modules.libs.Roles;

const navigationItems = [
  {
    id: QUERY,
    text: 'Consulta Ejecutivo',
    icon: DoubleFileIcon,
    iconActive: DoubleFileWhiteIcon,
    path: '/proceso95-5/consulta',
  },
  {
    id: SCHEDULE,
    text: 'Agenda',
    icon: AgendaIcon,
    iconActive: AgendaWhiteIcon,
    path: '/proceso95-5/agenda',
  },
  {
    id: QUERY_PROCEDURE,
    text: 'Consulta Analista',
    icon: DoubleFileIcon,
    iconActive: DoubleFileWhiteIcon,
    path: '/proceso95-5/tramites',
  },
];

const filterNavigationByRole = () => {
  const options = [];

  navigationItems.forEach((item) => {
    if (show(item.id)) {
      options.push(item);
    }
  });

  return options;
};

export default () => filterNavigationByRole(navigationItems);
