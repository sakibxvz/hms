'use server';

import db from '@/lib/db'; // Ensure this imports your Prisma client

// Fetch all doctors
export async function getAllDoctors() {
	try {
		const doctors = await db.doctor.findMany({
			include: {
				employee:true
			}
		});
		return doctors;
	} catch (error) {
		console.error('Error fetching all doctors:', error);
		throw new Error('Failed to fetch doctors.');
	}
}

// Fetch a doctor by ID
export async function getDoctorById(id: number) {
	try {
		const doctor = await db.doctor.findUnique({
			where: { id },
		});
		if (!doctor) throw new Error('Doctor not found.');
		return doctor;
	} catch (error) {
		console.error('Error fetching doctor by ID:', error);
		throw new Error('Failed to fetch doctor.');
	}
}

// Create a new doctor
// Create a new doctor
/**
 * Create a doctor along with an employee record.
 * @param doctorData - Data to create the doctor.
 * @param employeeData - Data to create the employee.
 */
export async function createDoctorWithEmployee(
	doctorData: {
		firstName: string;
		lastName: string;
		specialization: string;
		contactNumber?: string;
		email?: string;
	},
	employeeData: {
		userId: string;
		firstName: string;
		lastName: string;
		department: string;
	}
) {
	try {
		// Step 1: Create the employee
		const employee = await db.employee.create({
			data: employeeData,
		});

		// Step 2: Create the doctor using the employee ID
		const doctor = await db.doctor.create({
			data: {
				...doctorData,
				employee: {
					connect: {
						id: employee.id, // Use the created employee's ID
					},
				},
			},
		});

		return doctor;
	} catch (error) {
		console.error('Error creating doctor with employee:', error);
		throw new Error('Failed to create doctor with employee');
	}
}

// Update an existing doctor
export async function updateDoctor(
	id: number,
	data: Partial<{
		firstName: string;
		lastName: string;
		specialization: string;
		medicalLicense?: string;
	}>
) {
	try {
		// Extract fields related to `doctor` and `employee`
		const { firstName, lastName, specialization, medicalLicense, ...rest } =
			data;

		// Update doctor-specific fields
		const doctorUpdate = {
			...(specialization && { specialization }),
			...(medicalLicense && { medicalLicense }),
			...rest,
		};

		// Update employee-specific fields
		const employeeUpdate = {
			...(firstName && { firstName }),
			...(lastName && { lastName }),
		};

		// Perform the update using a transaction
		const updatedDoctor = await db.$transaction(async (transaction) => {
			// Update the `doctor` table
			const updatedDoctorData = await transaction.doctor.update({
				where: { id },
				data: doctorUpdate,
			});

			// Update the related `employee` table if needed
			if (Object.keys(employeeUpdate).length > 0) {
				await transaction.employee.update({
					where: { id: updatedDoctorData.employeeId },
					data: employeeUpdate,
				});
			}

			return updatedDoctorData;
		});

		return updatedDoctor;
	} catch (error) {
		console.error('Error updating doctor:', error);
		throw new Error('Failed to update doctor.');
	}
}

// Delete a doctor
export async function deleteDoctor(id: number) {
	try {
		const deletedDoctor = await db.doctor.delete({
			where: { id },
		});
		return deletedDoctor;
	} catch (error) {
		console.error('Error deleting doctor:', error);
		throw new Error('Failed to delete doctor.');
	}
}
