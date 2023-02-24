import { CurrenciesList } from "../../types/enums/currenciesList";
import {
  RequestWithParamsAndQuery,
  ResponseWithBody,
} from "../../types/TypedRequestAndResponse";
import { IPrice } from "./Price.model";

interface Token {
  token: string;
}
interface ChainBody {
  pair?: CurrenciesList;
}

export type GetPriceRequest = RequestWithParamsAndQuery<Token, ChainBody>;
export type GetTatumPriceResponse = ResponseWithBody<IPrice>;
