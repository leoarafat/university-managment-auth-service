import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paiginationFields from '../../../constance/paigination';
import { ManagementDepartmentServices } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';
import { managementDepartmentFilterableFields } from './managementDepartment.constans';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result =
      await ManagementDepartmentServices.createManagementDepartment(
        managementDepartmentData
      );
    sendResponse<IManagementDepartment>(res, {
      statusCode: 400,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paiginationFields);
    const result =
      await ManagementDepartmentServices.getAllManagementDepartment(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Management Department retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentServices.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result =
      await ManagementDepartmentServices.updateManagementDepartment(
        id,
        updatedData
      );
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  }
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentServices.deleteByIdFromDB(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
