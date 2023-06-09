import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultySchema: createFacultyZodSchema,
  updateFacultySchema: updateFacultyZodSchema,
};
