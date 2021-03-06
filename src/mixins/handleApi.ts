/* istanbul ignore file */
import { ApiMixin } from './api'
import { FormMixin } from './form'
import { HandleErrorMixin } from './handleError'
import { SessionCsrfCookieMixin } from './sessionCsrfCookie'
import { Constructor } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function HandleApiMixin<T extends Constructor<any>>(superClass: T) {
  return class extends SessionCsrfCookieMixin(HandleErrorMixin(FormMixin(ApiMixin(superClass)))) {}
}
