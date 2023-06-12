import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paiginationFields from '../../../constance/paigination';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constans';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paiginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
