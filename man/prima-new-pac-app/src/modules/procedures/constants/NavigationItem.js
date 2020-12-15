import AgendaIcon from "../../../shared/images/iconos/agenda.svg";
import AgendaWhiteIcon from "../../../shared/images/iconos/agenda-white.svg";
import UsersMenuIcon from "../../../shared/images/iconos/userMenuIcon.png";
import UsersMenuIconActive from "../../../shared/images/iconos/userMenuIconActive.png";
import ProcedureIcon from "./../../../shared/images/iconos/procedure.svg";
import ProcedureIconActive from "./../../../shared/images/iconos/procedureWhite.svg";
import {
  ROLE_ADMIN,
  ROLE_SUPERVISOR,
} from "modules/procedures/constants/roles";

export default () => {
  const session = JSON.parse(sessionStorage.getItem("roles"));
  const isAdmin = session
    ? session.roles.includes(ROLE_ADMIN) ||
      session.roles.includes(ROLE_SUPERVISOR)
    : false;

  const showMenu = [];
  {
    showMenu.push({
      text: "Todos los trámites",
      icon: AgendaIcon,
      iconActive: AgendaWhiteIcon,
      path: "/tramites/detalles-tramites",
    });
    if (isAdmin) {
      showMenu.push({
        text: "Gestor de ejecutivos",
        icon: UsersMenuIconActive,
        iconActive: UsersMenuIcon,
        path: "/tramites/ejecutivos-list",
      });
      showMenu.push({
        text: "Administración de trámites",
        icon: ProcedureIcon,
        iconActive: ProcedureIconActive,
        path: "/tramites/tramites-setting",
      });
    }
  }

  return showMenu;
};
