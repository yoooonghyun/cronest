import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
  PRODUCTION = 'PRODUCTION',
  STAGE = 'STAGE',
  DEVELOPMENT = 'DEVELOPMENT',
  TEST = 'TEST',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  public readonly NODE_ENV: Environment = Environment.DEVELOPMENT;

  @IsNumber()
  public readonly HTTP_PORT: number;

  @IsString()
  public readonly DATABASE_URL: string;

  @IsBoolean()
  public readonly DATABASE_SSL_ENABLE: boolean = true;

  @IsString()
  @IsOptional()
  public readonly RABBIT_MQ_URL: string;

  @IsString()
  public readonly GRPC_ADDRESS: string;

  @IsString()
  public readonly ROOT_DIR: string = process.cwd();
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
