import { UserModel } from "../models/User/User.model";
import { ApiError } from "../exceptions/ApiError";
import { UserDTO } from "../dtos/User.dto";
import {
  compareStringWithHash,
  generateHashFromString,
} from "../utils/hashUtil";
import { CodeService } from "./Code.service";

class Service {
  public async register(email: string, password: string, code: string) {
    const isExists = await UserModel.findByEmail(email);

    if (isExists) {
      throw ApiError.BadRequest("User with this email is already exists");
    }

    await CodeService.verifyCode(email, code);

    const hashPassword = await generateHashFromString(password);
    const user = await UserModel.createByEmailAndPassword(email, hashPassword);
    const viewUser = new UserDTO(user);

    return viewUser;
  }

  public async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const result = await compareStringWithHash(password, user.password);

    if (!result) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const viewUser = new UserDTO(user);

    return viewUser;
  }

  public async changePasswordById(id: string, password: string) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.BadRequest("Invalid user id");
    }

    const compareresult = await compareStringWithHash(password, user.password);

    if (compareresult) {
      throw ApiError.BadRequest(
        "The new password must be different from the old password"
      );
    }

    const hashPassword = await generateHashFromString(password);
    user.password = hashPassword;
    await user.save();

    const viewUser = new UserDTO(user);

    return viewUser;
  }

  public async getAllUsers(skip: number = 0, limit: number = 10) {
    const users = await UserModel.findUsers(skip, limit);

    const viewUsers = users.map((user) => {
      return new UserDTO(user);
    });

    return viewUsers;
  }
}

export const UserService = new Service();
