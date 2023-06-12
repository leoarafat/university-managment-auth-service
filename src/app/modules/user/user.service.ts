import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { errorLogger } from '../../../shared/logger';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //Need a default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  //set role
  user.role = 'student';
  //Need a incremental unique id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  //generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    const NewStudent = await Student.create([student], { session });
    if (!NewStudent.length) {
      throw new ApiError(400, 'Failed to create student ');
    }
    //Set student id to user id
    user.student = NewStudent[0]._id;
    const NewUser = await User.create([user], { session });
    if (!NewUser.length) {
      throw new ApiError(400, 'Failed to create User ');
    }
    newUserAllData = NewUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    errorLogger.error(error);
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};
export const UserService = {
  createStudent,
};
