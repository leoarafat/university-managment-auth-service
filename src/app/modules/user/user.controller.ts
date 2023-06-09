import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
const createUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);
export const UserController = {
  createUserController,
};
