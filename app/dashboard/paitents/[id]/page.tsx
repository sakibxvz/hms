'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Coffee, Edit2, MoreHorizontal, Phone, Mail, MapPin, Clock, Activity, Pill, Cookie } from 'lucide-react'
import { useParams } from "next/navigation"
import { getPatientById } from "@/actions/paitent"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { calculateAge, formatDate } from "@/lib/utils"
import { getEmployeeById } from "@/actions/employee"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Component() {
    const { id: paitentId } = useParams()

    const [patient, setPatient] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState<boolean>(true);  // Track loading state
    const [error, setError] = useState<string | null>(null); // To track errors

    // Fetch patient data when paitentId changes
    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true);
            setError(null); // Clear any previous errors
            try {
                const result = await getPatientById(Number(paitentId)); // Assuming getPatientById is an async function
                setPatient(result); // Set patient data when loaded
            } catch (err) {
                setError("Failed to fetch patient data"); // Handle errors
            } finally {
                setLoading(false); // Stop loading once the request is complete
            }
        };

        if (paitentId) {
            fetchPatientData();
        }
    }, [paitentId]); // This will re-run if paitentId changes

    // Rendering logic
    if (loading) {
        return <div className="container m-auto "><Spinner /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {/* <p>{JSON.stringify(patient)}</p> */}
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Patient profile</TabsTrigger>
                    <TabsTrigger value="bill">Bill</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="lab">Lab results</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-6">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="/placeholder.svg" alt="Ahmed Ali Hussain" />
                                <AvatarFallback>{patient.firstName?.[0]}{patient.lastName?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">{patient.firstName} {patient.lastName}</h1>
                                    <Button variant="ghost" size="icon">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {patient.Address}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Activity className="h-4 w-4" />
                                    {patient.Occupation}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {`${formatDate(patient.dateOfBirth)} (${calculateAge(patient.dateOfBirth)} age)`}
                                </div>
                            </div>
                        </div>
                        <Button>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold"> {patient.BMI}</div>
                                <div className="text-sm text-muted-foreground"> BMI</div>

                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{patient.Weight} kg</div>
                                <div className="text-sm text-muted-foreground">Weight</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{patient.Height} cm</div>
                                <div className="text-sm text-muted-foreground">Height</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{patient.BP} /80</div>
                                <div className="text-sm text-muted-foreground">Blood pressure</div>

                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        {/* Medical History  */}
                        {
                            patient.medicalHistory.length > 0 && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Medical history</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {patient.medicalHistory.map((history, i: number) => (
                                            <div key={i} className="flex items-start">
                                                <div className="flex flex-col items-center mr-4 mt-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    {i !== 4 && <div className="w-0.5 h-full bg-border" />}
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">{formatDate(history.date)}</div>
                                                    <div className="font-medium">{history.condition}</div>
                                                    <div className="text-sm text-muted-foreground">{history.diagnosis}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        }


                        <div className="space-y-6">

                            {/* Assinged Doctor  */}
                            {patient.doctorId && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Assinged Doctor</CardTitle>

                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Link href={`/dashboard/doctor/${patient.doctor.id}`}>
                                            <p className="text-sm font-medium hover:underline">{patient.doctorInformation.firstName}  {patient.doctorInformation.lastName}</p>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">Specalization: {patient.doctor.specialization}</p>
                                    </div>

                                </CardContent>
                            </Card>}

                            {/* Piatnet Operation  */}
                            {patient.Operation.length > 0 && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Operation</CardTitle>
                                </CardHeader>
                                {patient.Operation.map((operation) => (
                                    <CardContent key={operation.id} className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">

                                                <span>{operation.name}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">{operation.description}</div>
                                            <div className="text-sm">Cost: ${operation.cost.toFixed(2)}</div>
                                            <div className="text-sm">Date: {new Date(operation.date).toLocaleDateString()}</div>
                                        </div>
                                    </CardContent>
                                ))}
                            </Card>}

                            {/* pescription  */}
                            {patient.prescriptions.length > 0 && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Prescriptions</CardTitle>
                                </CardHeader>
                                {patient.prescriptions.map((prescription) => (
                                    <CardContent key={prescription.id} className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span>Prescription ID: {prescription.id}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">Dosage: {prescription.dosage}</div>
                                            <div className="text-sm">Instructions: {prescription.instructions}</div>
                                            <div className="text-sm">Date: {new Date(prescription.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </CardContent>
                                ))}
                            </Card>}


                        </div>
                    </div>

                    {patient.prescriptions.length > 0 && <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">Medications</CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Instruction</TableHead>
                                        <TableHead>Medicine Name</TableHead>
                                        <TableHead>Start date</TableHead>
                                        <TableHead>Assign by</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.prescriptions.map((prescription) => (
                                        <TableRow key={prescription.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Pill className="h-4 w-4" />
                                                    <div>
                                                        <div>{prescription.dosage}</div>
                                                        <div className="text-sm text-muted-foreground">{prescription.instructions}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{prescription.dosage}</TableCell>
                                            <TableCell>{new Date(prescription.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>Doctor</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>}


                </TabsContent>

                <TabsContent value="bill" className="space-y-6">
                    {patient.Bill.length > 0 ? <div className="flex flex-col justify-between space-y-4 w-full">
                        {patient.Bill.map((bill) => (
                            <div key={bill.id} className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">Bill ID: {bill.id}</div>
                                    <div
                                        className={`text-sm px-2 py-1 rounded-full ${bill.status === "Paid"
                                            ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                                            }`}
                                    >
                                        {bill.status}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                    <div>Total Amount: ${bill.totalAmount.toFixed(2)}</div>
                                    <div>Created At: {new Date(bill.createdAt).toLocaleDateString()}</div>
                                    <div>Updated At: {new Date(bill.updatedAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="m-5"><p className="font-bold text-2xl">No Bill Updated yet</p></div>}

                </TabsContent>


            </Tabs>
        </div>
    )
}