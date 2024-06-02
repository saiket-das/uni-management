import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { ErrorSourcesProps } from '../interfaces/error.interface';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default values
  let satusCode = 500;
  let errorMessage = 'Something went wrong';
  let errorSources: ErrorSourcesProps = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // handle zod validation error
  if (err instanceof ZodError) {
    const simplifiedZodError = handleZodError(err);
    satusCode = simplifiedZodError?.statusCode;
    errorMessage = simplifiedZodError?.message;
    errorSources = simplifiedZodError?.errorSources;
  }
  // handle mongoose validation error
  else if (err?.name === 'ValidationError') {
    const simplifiedValidationError = handleValidationError(err);
    satusCode = simplifiedValidationError?.statusCode;
    errorMessage = simplifiedValidationError?.message;
    errorSources = simplifiedValidationError?.errorSources;
  }
  // handle mongoose cast error
  else if (err?.name === 'CastError') {
    const simplifiedCastError = handleCastError(err);
    satusCode = simplifiedCastError?.statusCode;
    errorMessage = simplifiedCastError?.message;
    errorSources = simplifiedCastError?.errorSources;
  }
  // handle mongoose 11000 error
  else if (err?.code === 11000) {
    const simplifiedDuplicateError = handleDuplicateError(err);
    satusCode = simplifiedDuplicateError?.statusCode;
    errorMessage = simplifiedDuplicateError?.message;
    errorSources = simplifiedDuplicateError?.errorSources;
  }
  // handle local appError
  else if (err instanceof AppError) {
    satusCode = err?.statusCode;
    errorMessage = err?.message;
    errorSources = [{ path: '', message: err?.message }];
  }
  // handle error
  else if (err instanceof Error) {
    errorMessage = err?.message;
    errorSources = [{ path: '', message: err?.message }];
  }

  return res.status(satusCode).json({
    success: false,
    message: errorMessage,
    errorSources: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // err,
  });
};

export default globalErrorHandler;

/* 
  -- Pattern --
  success: false,
  message: '....'
  errorSources: {
    path: '....',
    message: '....'
  }
  stack: '/' [DEVELOPMENT]
*/
