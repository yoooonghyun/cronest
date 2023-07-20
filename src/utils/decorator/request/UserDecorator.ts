/*
 * Copyright (c) 2022 Medir Inc.
 * Created on Sat Oct 29 2022
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
