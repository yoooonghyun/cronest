import { ScheduleJob } from 'src/model/model.module';

export interface PublisherDelegate {
  sendCallback(job: ScheduleJob): Promise<void>;
  sendScheduleSafety(job: ScheduleJob): Promise<void>;
}
