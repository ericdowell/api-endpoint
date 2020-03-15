import { CrudEndpoint } from '@/crudEndpoint'
import { AxiosResponse } from 'axios'

export class ResourceEndpoint extends CrudEndpoint {
  /**
   * Display a listing of the resource.
   *
   * @param {object=} params
   * @returns {Promise<any>}
   */
  index<T = any, R = AxiosResponse<T>>(params?: any): Promise<R> {
    params = params || {}
    return this.get<T, R>('/', { params })
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param {object} data
   * @param {object=} params
   * @returns {*|Promise<any | void>}
   */
  store<T = any, R = AxiosResponse<T>>(data: any, params?: any): Promise<R> {
    params = params || {}
    return this.post<T, R>('/', { data, params })
  }

  /**
   * Display the specified resource.
   *
   * @param {any} id
   * @param {object=} params
   * @returns {*|Promise<any | void>}
   */
  show<T = any, R = AxiosResponse<T>>(
    id: string | number,
    params?: any,
  ): Promise<R> {
    params = params || {}
    return this.get<T, R>(`/${id}`, { params })
  }

  /**
   * Update the specified resource in storage.
   *
   * @param {int} id
   * @param {object} data
   * @param {object=} params
   * @returns {*|Promise<any | void>}
   */
  update<T = any, R = AxiosResponse<T>>(
    id: string | number,
    data: any,
    params?: any,
  ): Promise<R> {
    params = params || {}
    return this.put<T, R>(`/${id}`, { data, params })
  }

  /**
   * Store or update specified resource in storage.
   *
   * @param {int|null|undefined} id
   * @param {object} data
   * @param {object=} params
   * @returns {*|Promise<any|void>}
   */
  storeOrUpdate<T = any, R = AxiosResponse<T>>(
    id: null | string | number,
    data: any,
    params?: any,
  ): Promise<R> {
    if (!id) {
      return this.store<T, R>(data, params)
    }
    return this.update<T, R>(id, data, params)
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param {int} id
   * @param {object=} params
   * @returns {*|Promise<any | void>}
   */
  destroy<T = any, R = AxiosResponse<T>>(
    id: string | number,
    params?: any,
  ): Promise<R> {
    params = params || {}
    return this.delete<T, R>(`/${id}`, { params })
  }
}