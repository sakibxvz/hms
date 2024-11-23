'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarDays, Clock, FileText, Users } from 'lucide-react'
import Schedule from '@/components/Global/doctor/Schedule'

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data based on the schema
  const doctor = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    specialization: 'Cardiology',
    medicalLicense: 'ML123456',
  }

  const patients = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', status: 'Good', lastVisit: '2023-06-01' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', status: 'Critical', lastVisit: '2023-06-05' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', status: 'Bad', lastVisit: '2023-06-03' },
  ]

  const schedule = [
    { id: 1, dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '17:00' },
    { id: 2, dayOfWeek: 'WEDNESDAY', startTime: '10:00', endTime: '18:00' },
    { id: 3, dayOfWeek: 'FRIDAY', startTime: '09:00', endTime: '17:00' },
  ]

  const prescriptions = [
    { id: 1, patientName: 'Alice Johnson', medicines: ['Aspirin', 'Lisinopril'], date: '2023-06-01' },
    { id: 2, patientName: 'Bob Smith', medicines: ['Metformin', 'Atorvastatin'], date: '2023-06-05' },
  ]

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Dr. {doctor.lastName}</h1>
          <p className="text-muted-foreground">Specialization: {doctor.specialization}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder-avatar.jpg" alt={`${doctor.firstName} ${doctor.lastName}`} />
          <AvatarFallback>{doctor.firstName[0]}{doctor.lastName[0]}</AvatarFallback>
        </Avatar>
      </header>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" onClick={() => setActiveTab('overview')}>Overview</TabsTrigger>
          <TabsTrigger value="patients" onClick={() => setActiveTab('patients')}>Patients</TabsTrigger>
          <TabsTrigger value="schedule" onClick={() => setActiveTab('schedule')}>Schedule</TabsTrigger>
          <TabsTrigger value="prescriptions" onClick={() => setActiveTab('prescriptions')}>Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Prescriptions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{prescriptions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Working Hours This Week</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>You have {patients.length} total patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Visit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.firstName} {patient.lastName}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === 'Good' ? 'default' : patient.status === 'Critical' ? 'destructive' : 'warning'}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>Manage and view your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.firstName} {patient.lastName}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === 'Good' ? 'default' : patient.status === 'Critical' ? 'destructive' : 'warning'}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Schedule />
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
              <CardDescription>Manage and view recent prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Medicines</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.patientName}</TableCell>
                      <TableCell>{prescription.medicines.join(', ')}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}