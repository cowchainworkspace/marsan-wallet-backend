export abstract class AbstractApi {
  public get: <T>(path: string) => Promise<T>;
  public post: <T, K>(path: string, body: K) => Promise<T>;
  public delete: <T>(path: string) => Promise<T>;
}
