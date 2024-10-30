import { Inject, Injectable } from "@nestjs/common"
import IServerHTTP from "./interfaces/IServerHTTP"

@Injectable()
export default class ServerHTTP implements IServerHTTP {
  constructor(
    @Inject("IHttpServer")
    private readonly httpServer: (
      input: RequestInfo,
      init?: RequestInit
    ) => Promise<Response>
  ) {}

  async get(url: string, options?: RequestInit): Promise<Response> {
    return this.httpServer(url, { ...options, method: "GET" })
  }

  async post(
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<Response> {
    return this.httpServer(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  async put(
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<Response> {
    return this.httpServer(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  async delete(url: string, options?: RequestInit): Promise<Response> {
    return this.httpServer(url, { ...options, method: "DELETE" })
  }
}
