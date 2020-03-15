/* global FormData */
import { ResourceEndpoint } from '@/resourceEndpoint'
import qs from 'qs'
import { AxiosRequestConfig, Method } from 'axios'

export class ResourceApiEndpoint extends ResourceEndpoint {
  /**
   * Always set Content-Type to application/x-www-form-urlencoded, place in assign last.
   *
   * @type {{}}
   * @protected
   */
  _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  /**
   *
   * @type {boolean}
   * @private
   */
  _stringify = true

  /**
   *
   * @returns {string}
   */
  get apiVersion(): string {
    return 'v1'
  }

  /**
   * This it the middle of the url path, usually a group prefix.
   * e.g. api/v1 or user/settings
   *
   * @returns {string}
   */
  get path(): string {
    return `api/${this.apiVersion}`
  }

  /**
   *
   * @returns {this}
   */
  preventStringify(): this {
    this._stringify = false
    return this
  }

  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {AxiosRequestConfig} options
   * @returns {AxiosRequestConfig}
   */
  queryOptions(
    url: string,
    method: Method,
    options: AxiosRequestConfig,
  ): AxiosRequestConfig {
    options = super.queryOptions(url, method, options)
    if (!options.data || typeof options.data !== 'object') {
      return options
    }
    if (this._stringify && !(options.data instanceof FormData)) {
      options.data = qs.stringify(options.data)
    }
    return options
  }
}