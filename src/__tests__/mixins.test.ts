import { Endpoint } from '../endpoint'
import { ApiEndpointMixin } from '../mixins'
import qs = require('qs')

class TestEndpoint extends ApiEndpointMixin(Endpoint) {}

describe('ApiEndpointMixin', (): void => {
  it('values are inherited by Endpoint', (): void => {
    expect.assertions(6)
    const endpoint = new TestEndpoint()
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    expect(endpoint.config).toStrictEqual({
      headers,
    })
    expect(endpoint.apiVersion).toBe('')
    expect(endpoint.path).toBe('api')
    expect(endpoint.shouldStringify).toBe(true)
    const data = 'string'
    const stringify = jest.spyOn(qs, 'stringify').mockImplementation((): string => 'string')
    expect(endpoint.requestConfig('url', 'get', { data }))
      .toMatchInlineSnapshot(`
      Object {
        "baseURL": "http://localhost/api",
        "data": "string",
        "headers": Object {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "get",
        "paramsSerializer": [Function],
        "url": "url",
      }
    `)
    expect(stringify).toHaveBeenCalledTimes(0)
    stringify.mockRestore()
  })

  it('preventStringify set shouldStringify to false', (): void => {
    expect.assertions(2)
    const endpoint = new TestEndpoint()
    expect(endpoint.shouldStringify).toBe(true)
    endpoint.preventStringify()
    expect(endpoint.shouldStringify).toBe(false)
  })

  it('calling preventStringify before requestConfig prevents call to qs.stringify', (): void => {
    expect.assertions(2)
    const endpoint = new TestEndpoint()
    endpoint.preventStringify()
    const stringify = jest.spyOn(qs, 'stringify').mockImplementation((): string => 'string')
    const data = { foo: 'bar' }
    expect(endpoint.requestConfig('url', 'get', { data }))
      .toMatchInlineSnapshot(`
      Object {
        "baseURL": "http://localhost/api",
        "data": Object {
          "foo": "bar",
        },
        "headers": Object {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "get",
        "paramsSerializer": [Function],
        "url": "url",
      }
    `)
    expect(stringify).toHaveBeenCalledTimes(0)
    stringify.mockRestore()
  })

  it('requestConfig calls qs.stringify if data is an object and not FormData', (): void => {
    expect.assertions(2)
    const endpoint = new TestEndpoint()
    const stringify = jest.spyOn(qs, 'stringify').mockImplementation((): string => 'string')
    const data = { foo: 'bar' }
    expect(endpoint.requestConfig('url', 'get', { data }))
      .toMatchInlineSnapshot(`
      Object {
        "baseURL": "http://localhost/api",
        "data": "string",
        "headers": Object {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "get",
        "paramsSerializer": [Function],
        "url": "url",
      }
    `)
    expect(stringify).toHaveBeenCalledTimes(1)
    stringify.mockRestore()
  })
})