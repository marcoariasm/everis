/* import {userConstants} from '../../constants/user.constants'
import {rolesService} from '../../services/roles.service'

export const rolesActions = {
  getCurrentUserRoles
}

function getCurrentUserRoles() {
  return dispatch => {
    dispatch(request())

    rolesService.getCurrentUserRoles().then(
        roles => {
          dispatch(success(roles))
        },
        error => {
          dispatch(failure(error.toString()))
        },
    )
  }

  function request() {
    return {type: userConstants.ROLES_REQUEST}
  }

  function success(roles) {
    return {type: userConstants.ROLES_SUCCESS, roles}
  }

  function failure(error) {
    return {type: userConstants.ROLES_FAILURE, error}
  }
} */