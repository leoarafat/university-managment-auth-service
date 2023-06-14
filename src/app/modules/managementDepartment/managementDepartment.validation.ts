import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
  }),
});

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentSchema: createManagementDepartmentZodSchema,
  updateManagementDepartmentSchema: updateManagementDepartmentZodSchema,
};
