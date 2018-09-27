import { logger } from '../common/logger';

interface MyServiceInput {
  correlationId: string;
  body: any;
}

const myFunction = (input: MyServiceInput): Promise<void>  => {
  logger.info({
    correlationId: input.correlationId,
    message: `#myService#myFunction - ${input.body}`,
  });

  return Promise.resolve();
};

export { myFunction };
