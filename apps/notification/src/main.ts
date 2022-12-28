import { Transport } from '@nestjs/microservices';
import { bootstrap } from '@taskapp/service-core';
import { AppModule } from './app.module';

bootstrap(AppModule, [
  {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'notifications',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
]);
