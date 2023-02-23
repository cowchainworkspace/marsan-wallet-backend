export interface ITatumApiConfig {
  apiKey: string;
  apiUrl: string;
}

const configSelector = (): ITatumApiConfig => {
  const api_key = process.env.TATUM_API_KEY;
  if (!api_key) {
    throw new Error("Tatum API key not exists or invalid");
  }

  const config: ITatumApiConfig = {
    apiKey: api_key,
    apiUrl: "https://api.tatum.io",
  };

  return config;
};

export const tatumApiConfig: ITatumApiConfig = configSelector()