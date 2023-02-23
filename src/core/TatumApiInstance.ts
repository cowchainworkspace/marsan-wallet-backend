import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { mainConfig } from "../config/mainConfig";
import { AbstractApi } from "../types/AbstractApi";

export class TatumApiInstance implements AbstractApi {
  private _api: AxiosInstance;
  private _config = mainConfig.tatumApi;

  constructor(config?: Omit<CreateAxiosDefaults, "baseURL">) {
    const probablyCfg = config ? config : {};

    const { headers, ...otherOptions } = probablyCfg;
    const tatumHeaders = {
      "x-api-key": this._config.apiKey,
      ...headers,
    };

    const instance = axios.create({
      baseURL: this._config.apiUrl,
      headers: tatumHeaders,
      ...otherOptions,
    });

    this._api = instance;
  }

  public async get<T>(path: string) {
    const result = await this._api.get<T>(path);
    return result.data;
  }

  public async post<T, K>(path: string, body: K) {
    const result = await this._api.post<T>(path, body);
    return result.data;
  }

  public async delete<T>(path: string) {
    const result = await this._api.delete<T>(path);
    return result.data;
  }
}
