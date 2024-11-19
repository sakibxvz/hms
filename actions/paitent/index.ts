'use server';

import db from '@/lib/db';

export async function getAllPatients() {
	try {
		const patients = await db.patient.findMany();
		return patients;
	} catch (error) {
		console.error('Error fetching patients:', error);
		throw new Error('Failed to fetch patients.');
	}
}

export async function getPatientById(patientId: number) {
	try {
		const patient = await db.patient.findUnique({
			where: { id: patientId },
		});

		if (!patient) {
			throw new Error('Patient not found.');
		}

		return patient;
	} catch (error) {
		console.error('Error fetching patient:', error);
		throw new Error('Failed to fetch patient.');
	}
}

export async function createPatient(data: {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	contactNumber?: string;
	email?: string;
	address?: string;
}) {
	try {
		const patient = await db.patient.create({
			data,
		});

		return patient;
	} catch (error) {
		console.error('Error creating patient:', error);
		throw new Error('Failed to create patient.');
	}
}

export async function updatePatient(
	patientId: number,
	data: Partial<{
		firstName: string;
		lastName: string;
		dateOfBirth: Date;
		gender: string;
		contactNumber?: string;
		email?: string;
		address?: string;
	}>
) {
	try {
		const updatedPatient = await db.patient.update({
			where: { id: patientId },
			data,
		});

		return updatedPatient;
	} catch (error) {
		console.error('Error updating patient:', error);
		throw new Error('Failed to update patient.');
	}
}

export async function deletePatient(patientId: number) {
	try {
		await db.patient.delete({
			where: { id: patientId },
		});

		return { message: 'Patient deleted successfully.' };
	} catch (error) {
		console.error('Error deleting patient:', error);
		throw new Error('Failed to delete patient.');
	}
}

export async function getPatientPrescriptionByPatientId(patientId: number) {
	try {
		const prescriptions = await db.prescription.findMany({
			where: { patientId },
			include: {
				medicines: true, // Assuming prescriptions include related medications
				doctor: true, // Including the prescribing doctor's details
			},
		});

		if (prescriptions.length === 0) {
			throw new Error('No prescription records found for this patient.');
		}

		return prescriptions;
	} catch (error) {
		console.error('Error fetching prescriptions:', error);
		throw new Error('Failed to fetch prescriptions.');
	}
}

export async function getPatientMedicalHistoryById(patientId: number) {
	try {
		// Fetch medical history with correct field inclusion
		const medicalHistory = await db.medicalHistory.findMany({
			where: { patientId },
			orderBy: { date: 'desc' }, // Sort by date to get the most recent first
			select: {
				// Explicitly select the fields
				id: true,
				condition: true,
				diagnosis: true,
				date: true,
			},
		});

		if (medicalHistory.length === 0) {
			throw new Error('No medical history records found for this patient.');
		}

		return medicalHistory;
	} catch (error) {
		console.error('Error fetching medical history:', error);
		throw new Error('Failed to fetch medical history.');
	}
}
