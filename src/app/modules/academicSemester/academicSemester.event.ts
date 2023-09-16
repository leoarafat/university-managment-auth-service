import { RedisClient } from '../../../shared/redis';
import { AcademicSemesterService } from './academicSemester.Service';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constance';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);

    await AcademicSemesterService.createSemesterFromEvent(data);
    //console.log(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterService.updateOneIntoDBFromEvent(data);
    //console.log("Updated data: ", data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicSemesterService.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicSemesterEvents;
