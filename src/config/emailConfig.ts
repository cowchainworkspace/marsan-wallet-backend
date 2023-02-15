export interface IEmailConfig {
  login: string;
  password: string;
  service: string;
}

const configSelector = (): IEmailConfig => {
  const login = process.env.GOOGLE_EMAIL_LOGIN;
  const password = process.env.GOOGLE_EMAIL_PASSWORD;

  if (!login || !password) {
    throw new Error(
      "[Email config]: required GOOGLE credentials not defined or invalid"
    );
  }

  return { login, password, service: "gmail" };
};

export const emailConfig = configSelector();
