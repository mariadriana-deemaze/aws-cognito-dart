import { ValidationPipeOptions, BadRequestException, ValidationPipe, HttpStatus } from '@nestjs/common';

const GlobalValidationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  validateCustomDecorators: true,
  exceptionFactory: (errors): void => {
    const result = errors.map((error) => ({
      property: error.property,
      message: Object.values(error?.constraints ?? [])
    }));
    throw new BadRequestException({
      errors: result,
      message: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST
    });
  }
};

export const GlobalValidationPipe = new ValidationPipe(GlobalValidationPipeOptions);
