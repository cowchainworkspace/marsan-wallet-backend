import { createTransport, Transporter } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { mainConfig } from "../config/mainConfig";
import { VerifyEmailDTO } from "../dtos/VerifyEmail.dto";
import { getVerificationCodeHTML } from "../html/VerificationCodeMail";
import { VerifyEmailModel } from "../models/VerifyEmail/VerifyEmail.model";
import { CodeService } from "./Code.service";

class Service {
  private _emailCfg = mainConfig.email;
  private _transport: Transporter;

  constructor() {
    this._transport = this._createTransport();
  }

  public async sendCode(email: string, code: string) {
    const title = "Marsan verification code";
    const html = getVerificationCodeHTML(code);
    const mail = this._generateMessage(email, title, html);
    await this._transport.sendMail(mail);
  }

  private _createTransport = () => {
    const transport = createTransport({
      service: this._emailCfg.service,
      auth: { user: this._emailCfg.login, pass: this._emailCfg.password },
    });

    return transport;
  };

  private _generateMessage(
    email: string,
    title: string,
    html: string
  ): MailOptions {
    const options: MailOptions = {
      from: this._emailCfg.login,
      to: email,
      subject: title,
      html,
    };
    return options;
  }
}

export const EmailService = new Service();
