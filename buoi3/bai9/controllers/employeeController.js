import * as EmployeeModel from "../models/Employee.js";
import { AppError } from "../utils/AppError.js";

export const getEmployees = (req, res, next) => {
  try {
    const employees = EmployeeModel.getAll();
    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

export const getEmployeeById = (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = EmployeeModel.findById(id);

    if (!employee) {
      return next(new AppError("Không tìm thấy nhân viên", 404));
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

export const createEmployee = (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new AppError("Thiếu name hoặc email", 400));
    }

    const existingEmployee = EmployeeModel.findByEmail(email);
    if (existingEmployee) {
      return next(new AppError("Email đã tồn tại", 409));
    }

    const newEmployee = EmployeeModel.create({ name, email });
    return res.status(201).json({
      success: true,
      data: newEmployee,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployeeAvatar = (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = EmployeeModel.findById(id);

    if (!employee) {
      return next(
        new AppError("Không tìm thấy nhân viên để cập nhật avatar", 404),
      );
    }

    if (!req.file) {
      return next(new AppError("Vui lòng chọn file avatar", 400));
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const updatedEmployee = EmployeeModel.updateAvatar(id, avatarUrl);

    return res.status(200).json({
      success: true,
      message: "Upload avatar thành công",
      data: updatedEmployee,
    });
  } catch (err) {
    next(err);
  }
};
