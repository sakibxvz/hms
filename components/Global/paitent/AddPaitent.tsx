'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getAllDoctors } from '@/actions/doctor';
import { createPatient } from '@/actions/paitent';
import { useRouter } from 'next/navigation';

// Zod schema for validation
const patientSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
    gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Gender is required' }),
    BMI: z
        .preprocess((value) => Number(value), z.number().positive({ message: 'BMI must be positive' })),
    Weight: z
        .preprocess((value) => Number(value), z.number().positive({ message: 'Weight must be positive' })),
    Height: z
        .preprocess((value) => Number(value), z.number().positive({ message: 'Height must be positive' })),
    BP: z
        .preprocess((value) => Number(value), z.number().positive({ message: 'BP must be positive' })),
    Address: z.string().optional(),
    Occupation: z.string().optional(),
    status: z.enum(['Critical', 'Good', 'Bad', 'Emergency'], { required_error: 'Status is required' }),
    doctorId: z.number({ required_error: 'Assigning a doctor is required' }),
});

type PatientFormData = z.infer<typeof patientSchema>;

const AddPatient = () => {
    const router = useRouter()

    const form = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            BMI: undefined,
            Weight: undefined,
            Height: undefined,
            BP: undefined,
            Address: '',
            Occupation: '',
        },
    });

    const [doctors, setDoctors] = useState<
        Awaited<ReturnType<typeof getAllDoctors>>
    >([]);

    useEffect(() => {
        // Fetch doctors and set state
        const fetchDoctors = async () => {
            const doctors = await getAllDoctors();
            setDoctors(doctors);
        };
        fetchDoctors();


    }, []);

    const onSubmit: SubmitHandler<PatientFormData> = async (values) => {
        try {
            // Transform the form data into the expected format for createPatient
            const patientData = {
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
                BMI: values.BMI,
                Weight: values.Weight,
                Height: values.Height,
                BP: values.BP,
                Address: values.Address || undefined,
                Occupation: values.Occupation || undefined,
                status: values.status,
                doctorId: values.doctorId,
            };


            // Call the server action to create the patient
            const createdPatient = await createPatient(patientData);
            router.push(`/dashboard/paitents/${createdPatient.id}`)

        } catch (error) {
            console.error('Error creating patient:', error);
            alert('Failed to create patient.');
        }
    };



    return (
        <div className="container mx-auto p-6 max-w-4xl shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* First Name */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter first name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Last Name */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter last name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date of Birth */}
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Gender */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* BMI */}
                        <FormField
                            control={form.control}
                            name="BMI"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>BMI</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Enter BMI" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Weight */}
                        <FormField
                            control={form.control}
                            name="Weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Enter weight" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Height */}
                        <FormField
                            control={form.control}
                            name="Height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Height</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Enter height" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Blood Pressure */}
                        <FormField
                            control={form.control}
                            name="BP"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blood Pressure</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Enter BP" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Occupation */}
                        <FormField
                            control={form.control}
                            name="Occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occupation</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter occupation" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="Critical">Critical</SelectItem>
                                                    <SelectItem value="Good">Good</SelectItem>
                                                    <SelectItem value="Bad">Bad</SelectItem>
                                                    <SelectItem value="Emergency">Emergency</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Assign Doctor */}
                        <FormField
                            control={form.control}
                            name="doctorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign Doctor</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value || '')}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Doctors</SelectLabel>
                                                    {doctors.map((doctor) => (
                                                        <SelectItem key={doctor.id} value={String(doctor.id)}>
                                                            {doctor.employee.firstName + ' ' + doctor.employee.lastName}     ({doctor.specialization} )
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center ">
                        <Button className='w-full' type="submit">Submit</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddPatient;
