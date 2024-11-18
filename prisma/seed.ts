import { PrismaClient, Role, Department, DayOfWeek } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const randomEnumValue = <T extends object>(enumObj: T): T[keyof T] => {
	const enumValues = Object.values(enumObj) as Array<T[keyof T]>;
	return enumValues[Math.floor(Math.random() * enumValues.length)];
};

const seed = async () => {
	// Create 10 users (2 ADMIN, 4 DOCTOR, 4 other roles)
	const users = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			const username = faker.internet.userName();
			const email = faker.internet.email();

			return prisma.user.create({
				data: {
					username,
					password: 'sakib123', // Save the password as plain text
					email,
					image: faker.image.avatar(),
					role: randomEnumValue(Role), // Use Role enum directly
				},
			});
		})
	);

	// Create employees with roles and departments
	const employees = await Promise.all(
		users.map(async (user) => {
			const department = randomEnumValue(Department); // Use Department enum directly
			const role = department === 'DOCTOR' ? 'DOCTOR' : 'STAFF'; // Assign role based on department

			return prisma.employee.create({
				data: {
					userId: user.id,
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					department,
				},
			});
		})
	);

	// Create doctors with specialization
	const doctors = await Promise.all(
		employees
			.filter((employee) => employee.department === 'DOCTOR')
			.map(async (doctor) => {
				const doctorData = await prisma.doctor.create({
					data: {
						employeeId: doctor.id,
						specialization: faker.person.jobArea(),
						medicalLicense: faker.string.alphanumeric({
							length: { min: 5, max: 10 },
						}),
					},
				});

				// Create schedules for doctors
				await Promise.all(
					Array.from({ length: 5 }).map(async () => {
						const dayOfWeek = randomEnumValue(DayOfWeek); // Ensure this corresponds to the expected enum
						const startTime = faker.date.recent();
						const endTime = faker.date.soon();

						await prisma.schedule.create({
							data: {
								employeeId: doctor.id,
								dayOfWeek,
								startTime,
								endTime,
								description: faker.lorem.sentence(),
							},
						});
					})
				);

				return doctorData;
			})
	);

	// Create inventory items
	const inventories = await Promise.all(
		Array.from({ length: 5 }).map(() => {
			return prisma.inventory.create({
				data: {
					stock: faker.number.int({ min: 5, max: 100 }),
					restockDate: faker.date.future(),
				},
			});
		})
	);

	// Create 10 patients with associated bills, tests, medicines, operations
	const patients = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			const patient = await prisma.patient.create({
				data: {
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					dateOfBirth: faker.date.past({ years: 25 }),
					gender: randomEnumValue({ Male: 'Male', Female: 'Female' }) as string, // Gender placeholder (string enum could be better here)
					doctorId: doctors[Math.floor(Math.random() * doctors.length)].id,
				},
			});

			// Create medical history for patients
			await Promise.all(
				Array.from({ length: 2 }).map(async () => {
					await prisma.medicalHistory.create({
						data: {
							patientId: patient.id,
							condition: faker.lorem.words(),
							diagnosis: faker.lorem.words(),
							date: faker.date.recent({ days: 3 }),
						},
					});
				})
			);

			// Create prescriptions for patients
			const prescriptions = await Promise.all(
				Array.from({ length: 2 }).map(async () => {
					const prescription = await prisma.prescription.create({
						data: {
							doctorId: patient.doctorId,
							patientId: patient.id,
							dosage: faker.lorem.words(),
							instructions: faker.lorem.words(),
						},
					});

					// Add medicines to prescriptions
					await Promise.all(
						Array.from({ length: 2 }).map(async () => {
							await prisma.medicine.create({
								data: {
									name: faker.commerce.productName(),
									description: faker.lorem.sentence(),
									cost: parseFloat(faker.commerce.price()),
									quantity: faker.number.int({ min: 1, max: 5 }),
									prescriptionId: prescription.id,
									inventoryId:
										inventories[Math.floor(Math.random() * inventories.length)]
											.id, // Connect inventory item
								},
							});
						})
					);

					// Add lab tests to prescriptions
					await Promise.all(
						Array.from({ length: 2 }).map(async () => {
							await prisma.labTest.create({
								data: {
									name: faker.commerce.productName(),
									cost: parseFloat(faker.commerce.price()),
									prescriptionId: prescription.id,
								},
							});
						})
					);

					return prescription;
				})
			);

			const Status = {
				Paid: 'Paid',
				Pending: 'Pending',
			} as const;

			// Create bills for patients
			await Promise.all(
				prescriptions.map(async (prescription) => {
					await prisma.bill.create({
						data: {
							patientId: patient.id,
							totalAmount: parseFloat(faker.commerce.price()),
							status: faker.helpers.enumValue(Status),
						},
					});
				})
			);

			// Create operations for patients
			const operation = await prisma.operation.create({
				data: {
					patientId: patient.id,
					name: faker.commerce.productName(),
					description: faker.lorem.sentence(),
					cost: faker.number.float({ min: 500, max: 5000 }),
					date: faker.date.recent({
						days: faker.number.int({ min: 1, max: 10 }),
					}),
				},
			});

			await prisma.bill.update({
				where: {
					id: patient.id,
				},
				data: {
					operations: {
						connect: { id: operation.id },
					},
				},
			});

			return patient;
		})
	);

	console.log('Seed data successfully created!');
};

seed()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
