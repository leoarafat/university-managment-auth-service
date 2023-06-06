import { AcademicSemesterService } from './academicSemester.Service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
  }
);
export const AcademicSemesterController = {
  createSemester,
};
