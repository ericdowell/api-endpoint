import { CrudEndpoint } from '../crudEndpoint'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export class UserEndpoint extends CrudEndpoint {
  /**
   *
   * @param {string|number} userId
   * @param {AxiosRequestConfig=} params
   * @returns {Promise<any>}
   */
  show<T = any, R = AxiosResponse<T>>(userId: string | number, params?: AxiosRequestConfig): Promise<R> {
    params = params || {}
    return this.get<T, R>(`/user/${userId}`, { params })
  }

  /**
   *
   * @param {string|number} userId
   * @param {any} data
   * @returns {Promise<any>}
   */
  update<T = any, R = AxiosResponse<T>>(userId: string | number, data: any): Promise<R> {
    return this.put<T, R>(`/user/${userId}`, { data })
  }

  /**
   *
   * @param {string} email
   * @param {string} emailConfirmation
   * @param {any} name
   * @param {any} phone
   * @param {any} password
   * @param {any} passwordConfirmation
   * @param {boolean} remember
   * @returns {Promise<any>}
   */
  register<T = any, R = AxiosResponse<T>>(
    email: string,
    emailConfirmation: string,
    name: any,
    phone: any,
    password: any,
    passwordConfirmation: any,
    remember = true,
  ): Promise<R> {
    const data = {
      email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      email_confirmation: emailConfirmation,
      name,
      phone,
      password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      password_confirmation: passwordConfirmation,
      remember,
    }
    return this.post<T, R>('/register', { data })
  }

  /**
   *
   * @returns {Promise<any>}
   */
  resendEmailVerification<T = any, R = AxiosResponse<T>>(): Promise<R> {
    return this.post<T, R>('/email/resend')
  }

  /**
   *
   * @param {string} email
   * @returns {Promise<any>}
   */
  requestPasswordReset<T = any, R = AxiosResponse<T>>(email: string): Promise<R> {
    const data = {
      email,
    }
    return this.post<T, R>('/password/email', { data })
  }

  /**
   *
   * @param {any} currentPassword
   * @param {any} password
   * @param {any} passwordConfirmation
   * @returns {Promise<any>}
   */
  changePassword<T = any, R = AxiosResponse<T>>(
    currentPassword: any,
    password: any,
    passwordConfirmation: any,
  ): Promise<R> {
    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      current_password: currentPassword,
      password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      password_confirmation: passwordConfirmation,
    }
    return this.put<T, R>('/password/change', { data })
  }
}