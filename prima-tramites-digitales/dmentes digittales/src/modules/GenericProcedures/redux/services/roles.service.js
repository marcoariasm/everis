import { authHeader } from '../../shared/authHeader'
import { userService } from './user.service'

export const rolesService = {
  getCurrentUserRoles,
}

function getCurrentUserRoles() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.REACT_APP_API_URL}/security/my-roles`, requestOptions)
    .then(handleResponse)
    .then((roles) => {
      localStorage.setItem('roles', JSON.stringify(roles))

      return roles
    })
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
