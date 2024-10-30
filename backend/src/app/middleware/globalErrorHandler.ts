import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import handleCastError from "../../errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import ApiError from "../../errors/ApiError";
import config from "../../config";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500; // Default status code
  let message = "Something went wrong!!!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "validationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode || 400; // Use a fallback
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "castError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode || 400; // Use a fallback
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode || 400; // Use a fallback
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode || 500; // Use a fallback
    message = error.message;
    errorMessages = error?.message
      ? [{ path: "", message: error.message }]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }

  // Send the response with a valid status code
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
