import { Module } from '@nestjs/common';
import { CmdScheduleJobResolver } from 'src/resolver/schedule.job/cmd.schedule.job.resolver';
import { QryScheduleJobResolver } from 'src/resolver/schedule.job/qry.schedule.job.resolver';
import { ServiceModule } from 'src/service/service.module';

export * from 'src/resolver/schedule.job/cmd.schedule.job.resolver';
export * from 'src/resolver/schedule.job/qry.schedule.job.resolver';

@Module({
  imports: [ServiceModule],
  providers: [CmdScheduleJobResolver, QryScheduleJobResolver],
})
export class ScheduleJobResolverModule {}
