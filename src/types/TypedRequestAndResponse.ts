import { Request, Response } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithBodyAndParams<T, K> = Request<K, {}, T>;

export type ResponseWithBody<T> = Response<T>;
