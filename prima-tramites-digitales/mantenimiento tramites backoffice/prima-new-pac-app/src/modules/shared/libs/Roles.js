import {
  ROLE_FRONT,
  ROLE_BACK,
  ROLE_READ,
  ROLE_ADMIN,
  ROLE_SUPER,
  QUERY,
  QUERY_PROCEDURE,
  SCHEDULE,
} from 'modules/Retirement955/constants';
import AppSession from './AppSession';

const search = (array) => {
  const ROLES = AppSession.getRoles() ? AppSession.getRoles().roles : [];

  let res = false;
  for (let index = 0; index < ROLES.length; index++) {
    res = array.includes(ROLES[index]);
    if (res) {
      break;
    }
  };
  return res;
}

export const can = (args = '', tests) => {
  if (tests)return true;

  const items = args.split('.')
  let response = null
  switch (items.length) {
    case 2:
      response = permissions[items[0]][items[1]]
      break;
      
    case 3:
      response = permissions[items[0]][items[1]][items[2]]
      break;

    case 4:
      response = permissions[items[0]][items[1]][items[2]][items[3]]
      break;

    case 5:
      response = permissions[items[0]][items[1]][items[2]][items[3]][items[4]]
      break;
  
    default:
      break;
  }

  return response
};

const permissions = {
  schelude: {
    filter: search([ROLE_FRONT, ROLE_READ, ROLE_ADMIN, ROLE_SUPER]),
    table: '',
  },
  queryFront: {
    filter: search([ROLE_FRONT, ROLE_READ, ROLE_ADMIN, ROLE_SUPER]),
    table: {
      viewDetail: true,
      detailProcedure: {
        startAsesory: search([ROLE_FRONT, ROLE_ADMIN, ROLE_SUPER]),
        doAsesory: search([ROLE_FRONT, ROLE_ADMIN, ROLE_SUPER]),
      },
    }
  },
  queryBack: {
    filter: search([ROLE_BACK, ROLE_READ, ROLE_ADMIN, ROLE_SUPER]),
    table: {
      validateDocument: {
        viewValidateDocument: search([ROLE_BACK, ROLE_READ, ROLE_ADMIN, ROLE_SUPER]),
        takeDecision: search([ROLE_BACK, ROLE_ADMIN, ROLE_SUPER]),
      },
      viewExoneration: search([ROLE_BACK, ROLE_READ, ROLE_ADMIN, ROLE_SUPER]),
      execExoneration: search([ROLE_BACK, ROLE_ADMIN, ROLE_SUPER]),
      checked: true,
    },
  },
};

const viewsXmodules = {
  [SCHEDULE]: [ROLE_FRONT, ROLE_ADMIN, ROLE_SUPER],
  [QUERY]: [ROLE_FRONT, ROLE_READ, ROLE_ADMIN, ROLE_SUPER],
  [QUERY_PROCEDURE]: [ROLE_BACK, ROLE_ADMIN, ROLE_SUPER],
}

const show = (name) => {
  if (!name) {
    return false;
  }

  const ROLES = AppSession.getRoles() ? AppSession.getRoles().roles : [];

  let res = false;
  for (let index = 0; index < ROLES.length; index++) {
    res = viewsXmodules[name].includes(ROLES[index])
    if (res) {
      break;
    }
  }

  return res;
}

export default {
  can,
  show
};
