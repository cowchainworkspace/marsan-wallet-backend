import { mainConfig } from "../config/mainConfig";
import { SECOND } from "../constants";
import { ApiError } from "../exceptions/ApiError";
import { CodeModel } from "../models/Code/Code.model";
import { generateCode } from "../utils/generateCode";
import {
  compareStringWithHash,
  generateHashFromString,
} from "../utils/hashUtil";
import { EmailService } from "./Email.service";

class Service {
  public async verifyCode(email: string, code: string) {
    const dbCode = await CodeModel.findByUserEmail(email);

    if (!dbCode) {
      throw ApiError.BadRequest("Code is not exists");
    }

    const compareResult = await compareStringWithHash(code, dbCode.code);

    if (!compareResult) {
      throw ApiError.BadRequest("Invalid code");
    }

    await CodeModel.deleteById(dbCode._id.toString());
  }

  public async sendCode(email: string) {
    const oldCode = await CodeModel.findByUserEmail(email);
    const currentTimestamp = new Date().valueOf();
    if (oldCode) {
      const timePassed = currentTimestamp - oldCode.createdAt;
      if (timePassed < mainConfig.app.emailSendDelay * SECOND) {
        throw ApiError.BadRequest(
          `The time between requests should be more than ${mainConfig.app.emailSendDelay} seconds.`
        );
      }
      await CodeModel.deleteById(oldCode._id.toString());
    }
    const generatedCode = generateCode();

    const hashCode = await generateHashFromString(generatedCode);
    await CodeModel.createCode(email, hashCode);
    await EmailService.sendCode(email, generatedCode);
  }
}

export const CodeService = new Service();
