import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paiginationFields from '../../../constance/paigination';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import { adminFilterableFields } from './admin.constans';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paiginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateAdmin(id, updatedData);
  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});
export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
