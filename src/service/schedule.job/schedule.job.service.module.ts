import { Module } from '@nestjs/common';
import { QryScheduleJobService } from 'src/service/schedule.job/qry.schedule.job.service';
import { CmdScheduleJobService } from 'src/service/schedule.job/cmd.schedule.job.service';
import { ModelModule } from 'src/model/model.module';

export * from 'src/service/schedule.job/qry.schedule.job.service';
export * from 'src/service/schedule.job/cmd.schedule.job.service';

@Module({
  imports: [ModelModule],
  providers: [QryScheduleJobService, CmdScheduleJobService],
  exports: [QryScheduleJobService, CmdScheduleJobService],
})
export class ScheduleJobServiceModule {}
