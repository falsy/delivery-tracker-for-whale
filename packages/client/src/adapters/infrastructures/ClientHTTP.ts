import IClientHTTP from "./interfaces/IClientHTTP"

export default class ClientHTTP implements IClientHTTP {
  constructor(
    private readonly httpClient: (
      input: RequestInfo,
      init?: RequestInit
    ) => Promise<Response>
  ) {}

  get(url: string, options?: RequestInit): Promise<Response> {
    return this.httpClient(url, {
      method: "GET",
      ...options
    })
  }

  post(url: string, body: unknown, options?: RequestInit): Promise<Response> {
    return this.httpClient(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  put(url: string, body: unknown, options?: RequestInit): Promise<Response> {
    return this.httpClient(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  delete(url: string, options?: RequestInit): Promise<Response> {
    return this.httpClient(url, { ...options, method: "DELETE" })
  }
}
