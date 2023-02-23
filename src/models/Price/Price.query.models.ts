import { CurrenciesList } from "../../types/enums/currenciesList";
import {
  RequestWithParamsAndQuery,
  ResponseWithBody,
} from "../../types/TypedRequestAndResponse";
import { GetPriceResponse } from "../Tatum/Tatum.query.models";

interface Token {
  token: string;
}
interface ChainBody {
  pair?: CurrenciesList;
}

export type GetPriceRequest = RequestWithParamsAndQuery<Token, ChainBody>;
export type GetTatumPriceResponse = ResponseWithBody<GetPriceResponse>;
