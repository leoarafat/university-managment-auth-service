import { AcademicSemesterService } from './academicSemester.Service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paiginationFields from '../../../constance/paigination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableField } from './academicSemester.constance';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester created successfully',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableField);
  const paginationOptions = pick(req.query, paiginationFields);

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
