import { Module } from '@nestjs/common';
import { ScheduleJobResolverModule } from 'src/resolver/schedule.job/schedule.job.resolver.module';

export * from 'src/resolver/schedule.job/schedule.job.resolver.module';

@Module({
  imports: [ScheduleJobResolverModule],
})
export class ResolverModule {}
