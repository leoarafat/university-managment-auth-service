import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paiginationFields from '../../../constance/paigination';
import { AcademicFacultyServices } from './academicFaculty.service';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyFilterableFields } from '../academicSemester/academicSemester.constance';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyServices.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 400,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  console.log(req.user);
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paiginationFields);
  const result = await AcademicFacultyServices.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyServices.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AcademicFacultyServices.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.deleteByIdFromDB(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
