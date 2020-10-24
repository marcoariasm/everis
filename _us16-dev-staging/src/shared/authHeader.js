import moment from 'moment'
import {userService} from '../redux/services/user.service'
import SharedModule from 'modules/shared/index';

const { libs: { AppSession } } = SharedModule;

export function authHeader() {
  let user = AppSession.get()

  if (user && user.hasOwnProperty('accessToken') && user.accessToken) {
    const expireAt = user.hasOwnProperty('expireAt') && user.expireAt ?
        user.expireAt :
        undefined

    const isExpired = moment().subtract(5, 'minutes').isSameOrAfter(moment(expireAt, 'YYYY/MM/DD hh:mm:ss'))

    if (isExpired) {
      userService.refresh()
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.accessToken,
    }
  } else {
    return {}
  }
}