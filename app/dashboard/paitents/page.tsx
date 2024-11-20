"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Search,
    MoreVertical,
    UserPlus,
    Calendar,
    Clock,
    Filter,
    RefreshCcw,
    AlertTriangle,
    CheckCircle,
    AlertCircle,
    Zap,
} from "lucide-react";
import { getAllPatients } from "@/actions/paitent";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const getStatusColor = (status:string) => {
    return status === "Critical"
        ? "bg-red-100 text-red-700"
        : status === "Emergency"
            ? "bg-yellow-100 text-yellow-700"
            : status === "Good"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"; // Default for any unrecognized status
};

const upcomingAppointments = [
    {
        id: 1,
        patient: "David Wilson",
        time: "9:00 AM",
        date: "Tomorrow",
        type: "Follow-up",
    },
    {
        id: 2,
        patient: "Sarah Johnson",
        time: "2:30 PM",
        date: "Mar 25, 2024",
        type: "Check-up",
    },
    {
        id: 3,
        patient: "Michael Chen",
        time: "11:15 AM",
        date: "Mar 26, 2024",
        type: "Consultation",
    },
];

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");



    // Fetch patients using TanStack Query
    const { data: patients = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["patients"],
        queryFn: getAllPatients,
    });

    console.log(patients);

    const filteredPatients = patients.filter((patient) =>
        `${patient.firstName} ${patient.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="m-auto"><Spinner /></div>;
    }

    if (isError) {
        return <div>Error fetching patients.</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Patient Management</h1>
                    <p className="mt-1">Manage and monitor patient records</p>
                </div>
                <Link href='/dashboard/paitents/add'>
                <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add New Patient
                </Button></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Patients</p>
                            <h3 className="text-2xl font-bold">{patients.length}</h3>
                        </div>
                    </div>
                </Card>
                {/* Add more cards as needed */}
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Critical Paitents</p>
                            <h3 className="text-xl font-bold">
                                {patients.filter((patient) => patient.status === "Critical").length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Good Condition Paitents</p>
                            <h3 className="text-xl font-bold">
                                {patients.filter((patient) => patient.status === "Good").length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Zap className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Emergency Paitents</p>
                            <h3 className="text-xl font-bold">
                                {patients.filter((patient) => patient.status === "Emergency").length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Bad Condition Paitents</p>
                            <h3 className="text-xl font-bold">
                                {patients.filter((patient) => patient.status === "Bad").length}
                            </h3>
                        </div>
                    </div>
                </Card>



            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Patient List</h2>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search patients..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            setSearchTerm(''); // Reset search term
                                            refetch(); // Call the refetch function
                                        }}
                                    >
                                        <RefreshCcw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date of Birth</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Assigned Doctor</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPatients.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src="https://via.placeholder.com/150" />
                                                        <AvatarFallback>
                                                            {patient.firstName[0]}
                                                            {patient.lastName[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <Link href={`/dashboard/paitents/${patient.id}`}>
                                                            <p className="font-medium hover:underline">
                                                                {patient.firstName} {patient.lastName}
                                                            </p>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`${getStatusColor(patient.status)} border-0`}>
                                                    {patient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(patient.dateOfBirth).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{patient.gender}</TableCell>
                                            <TableCell className="hover:underline"><Link href={`/dashboard/doctor/${patient.doctorId}`}>{patient.doctorInfo.firstName + ' ' + patient.doctorInfo.lastName}</Link></TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            Archive Record
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Recently Added Patients</h2>
                            <div className="space-y-4">
                                {patients
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt descending
                                    .slice(0, 3) // Take the 3 most recent patients
                                    .map((patient) => (
                                        <div
                                            key={patient.id}
                                            className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                        >
                                            <div className="p-2 bg-blue-50 rounded-full">
                                                <Users className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <Link href={`/dashboard/paitents/${patient.id}`} className="font-medium hover:underline">
                                                    {patient.firstName} {patient.lastName}
                                                </Link>
                                                <p className="text-sm text-gray-500">
                                                    Doctor: {patient.doctorInfo.firstName} {patient.doctorInfo.lastName}
                                                </p>
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${patient.status === "Critical"
                                                            ? "bg-red-100 text-red-700"
                                                            : patient.status === "Emergency"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : patient.status === "Good"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {patient.status}
                                                </span>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Added on: {new Date(patient.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </Card>


                    {/* <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Upcoming Appointments
                            </h2>
                            <div className="space-y-4">
                                {upcomingAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="p-2 bg-purple-50 rounded-full">
                                            <Calendar className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{appointment.patient}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <p>{appointment.time}</p>
                                                <span>•</span>
                                                <p>{appointment.date}</p>
                                            </div>
                                            <Badge className="mt-2 bg-purple-100 text-purple-800 border-0">
                                                {appointment.type}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card> */}
                </div>
            </div>
        </div>
    );
}