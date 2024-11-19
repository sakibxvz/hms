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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Search,
    MoreVertical,
    UserPlus,
    Activity,
    Calendar,
    Clock,
    Filter,
    RefreshCcw,
} from "lucide-react";

const patients = [
    {
        id: 1,
        name: "Sarah Johnson",
        age: 45,
        status: "Active",
        condition: "Hypertension",
        lastVisit: "2024-03-20",
        nextAppointment: "2024-04-15",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
        id: 2,
        name: "Michael Chen",
        age: 32,
        status: "Scheduled",
        condition: "Diabetes Type 2",
        lastVisit: "2024-03-18",
        nextAppointment: "2024-04-01",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        age: 28,
        status: "Completed",
        condition: "Asthma",
        lastVisit: "2024-03-15",
        nextAppointment: "2024-05-10",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    {
        id: 4,
        name: "David Wilson",
        age: 52,
        status: "Active",
        condition: "Arthritis",
        lastVisit: "2024-03-10",
        nextAppointment: "2024-04-05",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
];

const recentActivities = [
    {
        id: 1,
        patient: "Sarah Johnson",
        action: "Prescription Updated",
        time: "2 hours ago",
    },
    {
        id: 2,
        patient: "Michael Chen",
        action: "Lab Results Added",
        time: "4 hours ago",
    },
    {
        id: 3,
        patient: "Emily Rodriguez",
        action: "Appointment Scheduled",
        time: "Yesterday",
    },
];

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

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800";
            case "scheduled":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
                    <p className="text-gray-500 mt-1">Manage and monitor patient records</p>
                </div>
                <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add New Patient
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Patients</p>
                            <h3 className="text-2xl font-bold">1,234</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Cases</p>
                            <h3 className="text-2xl font-bold">856</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Appointments Today</p>
                            <h3 className="text-2xl font-bold">28</h3>
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
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <RefreshCcw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Condition</TableHead>
                                        <TableHead>Last Visit</TableHead>
                                        <TableHead>Next Appointment</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPatients.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={patient.image} />
                                                        <AvatarFallback>
                                                            {patient.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{patient.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {patient.age} years old
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`${getStatusColor(patient.status)} border-0`}
                                                >
                                                    {patient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{patient.condition}</TableCell>
                                            <TableCell>{patient.lastVisit}</TableCell>
                                            <TableCell>{patient.nextAppointment}</TableCell>
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
                                                        <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
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
                            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="p-2 bg-blue-50 rounded-full">
                                            <Clock className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{activity.patient}</p>
                                            <p className="text-sm text-gray-500">{activity.action}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card>
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
                    </Card>
                </div>
            </div>
        </div>
    );
}