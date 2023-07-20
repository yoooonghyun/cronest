import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'src/logger/LoggerModule';
import { HttpLogger } from 'src/middleware/logger/HttpLogger';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConsumerModule } from './consumer/consumer.module';
import { EventHandlerModule } from './event.handler/event.handler.module';
import { ResolverModule } from './resolver/resolver.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'PRODUCTION',
      include: [ResolverModule],
    }),
    ResolverModule,
    LoggerModule,
    ConsumerModule,
    EventHandlerModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogger).forRoutes('/');
  }
}
