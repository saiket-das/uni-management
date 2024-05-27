import mongoose, { ObjectId } from 'mongoose';
import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Create a new student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student); // Built-in static method
  return result;
};

// Get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// Get student by Id
const getStudentByIdFromDB = async (studentId: string) => {
  const result = await StudentModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(studentId) } },
  ]);
  return result;
};

// Get student by Id
const deleteStudentById = async (studentId: string) => {
  const result = await StudentModel.updateOne(
    { _id: studentId },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  createStudentIntoDB,
  deleteStudentById,
};
