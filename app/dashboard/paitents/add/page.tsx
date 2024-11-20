'use client';

import React, { useState } from 'react';
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

// Zod schema for validation
const patientSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Gender is required' }),
  BMI: z.number({ required_error: 'BMI is required' }).positive('BMI must be positive'),
  Weight: z.number({ required_error: 'Weight is required' }).positive('Weight must be positive'),
  Height: z.number({ required_error: 'Height is required' }).positive('Height must be positive'),
  BP: z.number({ required_error: 'BP is required' }).positive('BP must be positive'),
  Address: z.string().optional(),
  Occupation: z.string().optional(),
  status: z.enum(['Critical', 'Good', 'Bad', 'Emergency'], { required_error: 'Status is required' }),
});

type PatientFormData = z.infer<typeof patientSchema>;

const AddPatient = () => {

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit: SubmitHandler<PatientFormData> = async (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Submit Button */}
          <div>
            <Button type="submit" >
              submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPatient;
