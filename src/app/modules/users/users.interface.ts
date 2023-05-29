export type IUser = {
  id: string
  role: string
  password: string
  createdAt: Date
  updatedAt: Date
  studentId?: string
  adminId?: string
  facultyId?: string
}
