import { VerifyEmailDTO } from "../dtos/VerifyEmail.dto";
import { VerifyEmailModel } from "../models/VerifyEmail/VerifyEmail.model";
import { CodeService } from "./Code.service";

class Service {
  public async verify(email: string, code: string) {
    await CodeService.verifyCode(email, code);
    const isExists = await VerifyEmailModel.findByEmail(email);
    if (isExists) {
      return new VerifyEmailDTO(isExists);
    }
    const verified = await VerifyEmailModel.createByEmail(email);
    const verifiedView = new VerifyEmailDTO(verified);
    return verifiedView;
  }
}

export const VerifyEmailService = new Service();
