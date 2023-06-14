import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paiginations';
import { ManagementDepartment } from './managementDepartment.model';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    const managementDepartmentSearchableFields = ['field1', 'field2']; // Add the actual searchable fields here
    const searchConditions = managementDepartmentSearchableFields.map(
      field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })
    );
    andConditions.push({ $or: searchConditions });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push(
      Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      }))
    );
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};
const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const deleteByIdFromDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentServices = {
  getAllManagementDepartment,
  createManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteByIdFromDB,
};
