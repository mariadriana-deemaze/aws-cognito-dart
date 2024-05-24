import { Params } from 'nestjs-pino';

const PinoLoggerConfig: Params = {
  pinoHttp: {
    enabled: !(process.env.NODE_ENV === 'test'),
    customProps: () => ({
      context: 'HTTP'
    }),
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              singleLine: true
            }
          }
        : undefined
  }
};

export default PinoLoggerConfig;
