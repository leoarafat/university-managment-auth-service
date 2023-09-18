import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { errorLogger } from '../../../shared/logger';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';
import { RedisClient } from '../../../shared/redis';
import { EVENT_FACULTY_CREATED, EVENT_STUDENT_CREATED } from './user.constants';

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
  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_STUDENT_CREATED,
      JSON.stringify(newUserAllData.student)
    );
  }
  return newUserAllData;
};

//Create admin
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  //Need a default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  //set role
  user.role = 'admin';

  //generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const NewAdmin = await Admin.create([admin], { session });
    if (!NewAdmin.length) {
      throw new ApiError(400, 'Failed to create admin ');
    }
    //Set student id to user id
    user.admin = NewAdmin[0]._id;
    //here i use array[] because of using transaction and rollback
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
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};
//create faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }
  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(400, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(404, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_FACULTY_CREATED,
      JSON.stringify(newUserAllData.faculty)
    );
  }
  return newUserAllData;
};
export const UserService = {
  createStudent,
  createAdmin,
  createFaculty,
};
