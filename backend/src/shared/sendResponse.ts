import { Response } from "express";

type TApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};

export const sendResponse = <T>(res: Response, data: TApiResponse<T>): void => {
  const statusCode = data.statusCode || 200; //

  const responseData: TApiResponse<T> = {
    statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };

  res.status(statusCode).json(responseData);
};
