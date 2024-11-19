// app/actions/employees/index.ts

import db from '@/lib/db';
import { Department } from '@prisma/client'; // Import the enum type

/**
 * Fetch all employees from the database.
 */
export async function getAllEmployees() {
	try {
		const employees = await db.employee.findMany({
			include: {
				user: true, // Include related user details if necessary
				payroll: true, // Include payroll data if needed
				schedules: true, // Include schedules
			},
		});
		return employees;
	} catch (error) {
		console.error('Error fetching employees:', error);
		throw new Error('Failed to fetch employees.');
	}
}

/**
 * Fetch a single employee by their ID.
 * @param employeeId - ID of the employee
 */
export async function getEmployeeById(employeeId: number) {
	try {
		const employee = await db.employee.findUnique({
			where: { id: employeeId },
			include: {
				user: true,
				payroll: true,
				schedules: true,
			},
		});
		if (!employee) throw new Error('Employee not found.');
		return employee;
	} catch (error) {
		console.error(`Error fetching employee with ID ${employeeId}:`, error);
		throw new Error('Failed to fetch employee.');
	}
}

/**
 * Create a new employee.
 * @param data - Employee data for creation
 */
export async function createEmployee(data: {
	userId: string;
	firstName: string;
	lastName: string;
	department: Department;
}) {
	try {
		const newEmployee = await db.employee.create({
			data,
		});
		return newEmployee;
	} catch (error) {
		console.error('Error creating employee:', error);
		throw new Error('Failed to create employee.');
	}
}

/**
 * Update an existing employee.
 * @param employeeId - ID of the employee to update
 * @param data - Updated employee data
 */
export async function updateEmployee(
	employeeId: number,
	data: {
		firstName?: string;
		lastName?: string;
		department?: Department;
	}
) {
	try {
		const updatedEmployee = await db.employee.update({
			where: { id: employeeId },
			data,
		});
		return updatedEmployee;
	} catch (error) {
		console.error(`Error updating employee with ID ${employeeId}:`, error);
		throw new Error('Failed to update employee.');
	}
}

/**
 * Delete an employee by their ID.
 * @param employeeId - ID of the employee to delete
 */
export async function deleteEmployee(employeeId: number) {
	try {
		const deletedEmployee = await db.employee.delete({
			where: { id: employeeId },
		});
		return deletedEmployee;
	} catch (error) {
		console.error(`Error deleting employee with ID ${employeeId}:`, error);
		throw new Error('Failed to delete employee.');
	}
}
