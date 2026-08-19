let employees = [
  { id: 1, name: "Nguyen Van A", email: "vana@example.com", avatarUrl: null },
  { id: 2, name: "Tran Thi B", email: "thib@example.com", avatarUrl: null },
];

let nextId = 3;

export const getAll = () => {
  return employees;
};

export const findById = (id) => {
  return employees.find((emp) => emp.id === Number(id));
};

export const findByEmail = (email) => {
  return employees.find((emp) => emp.email === email);
};

export const create = (data) => {
  const newEmployee = {
    id: nextId++,
    name: data.name,
    email: data.email,
    avatarUrl: null,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateAvatar = (id, avatarUrl) => {
  const employee = employees.find((emp) => emp.id === Number(id));
  if (employee) {
    employee.avatarUrl = avatarUrl;
    return employee;
  }
  return null;
};
