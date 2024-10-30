import IServerHTTP from "./interfaces/IServerHTTP";
export default class ServerHTTP implements IServerHTTP {
    private readonly httpServer;
    constructor(httpServer: (input: RequestInfo, init?: RequestInit) => Promise<Response>);
    get(url: string, options?: RequestInit): Promise<Response>;
    post(url: string, body: unknown, options?: RequestInit): Promise<Response>;
    put(url: string, body: unknown, options?: RequestInit): Promise<Response>;
    delete(url: string, options?: RequestInit): Promise<Response>;
}
//# sourceMappingURL=ServerHTTP.d.ts.map