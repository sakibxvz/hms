'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, FileText, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllDoctors } from '@/actions/doctor';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';

export default function AllDoctors() {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Flatten and enrich doctor data
  const enrichedDoctors = doctors.map((doctor) => ({
    ...doctor,
    ...doctor.employee, // Flatten employee data into the doctor object
  }));

  const filteredDoctors = enrichedDoctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctor Management</h1>
      </header>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${doctor.firstName} ${doctor.lastName}`} />
                  <AvatarFallback>{doctor.firstName[0]}{doctor.lastName[0]}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="mt-4">{doctor.firstName} {doctor.lastName}</CardTitle>
              <CardDescription>{doctor.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  {doctor.department}
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  License: {doctor.medicalLicense}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Link href={`/dashboard/doctors/${doctor.id}`}>
                <Button variant="outline" className="w-full justify-center">
                  View Full Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
