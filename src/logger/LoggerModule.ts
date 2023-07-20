/*
 * Copyright (c) 2022 Medir Inc.
 * Created on Fri Apr 22 2022
 */

import { Module } from '@nestjs/common';
import { CommonLogger } from 'src/logger/CommonLogger';

@Module({
  providers: [CommonLogger],
  exports: [CommonLogger],
})
export class LoggerModule {}
