export default interface IClientHTTP {
  get(url: string, options?: RequestInit): Promise<Response>
  post(url: string, body: unknown, options?: RequestInit): Promise<Response>
  put(url: string, body: unknown, options?: RequestInit): Promise<Response>
  delete(url: string, options?: RequestInit): Promise<Response>
}
