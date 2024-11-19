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

export default function Component() {
    return (
        <div className="container mx-auto p-6">
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="profile">Patient profile</TabsTrigger>
                    <TabsTrigger value="bgl">BGL Analysis</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="lab">Lab results</TabsTrigger>
                    <TabsTrigger value="goals">Mini Goals</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-6">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="/placeholder.svg" alt="Ahmed Ali Hussain" />
                                <AvatarFallback>AH</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">Ahmed Ali Hussain</h1>
                                    <Button variant="ghost" size="icon">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    Elshikh zayed Giza
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Activity className="h-4 w-4" />
                                    Accountant
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    12 Dec 1992 (38 years)
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
                                <div className="text-2xl font-bold">22.4</div>
                                <div className="text-sm text-muted-foreground">BMI</div>
                                <Badge className="mt-2 bg-green-100 text-green-800">+10</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">92 kg</div>
                                <div className="text-sm text-muted-foreground">Weight</div>
                                <Badge className="mt-2 bg-green-100 text-green-800">+10 kg</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">175 cm</div>
                                <div className="text-sm text-muted-foreground">Height</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">124/80</div>
                                <div className="text-sm text-muted-foreground">Blood pressure</div>
                                <Badge className="mt-2 bg-green-100 text-green-800">+10</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">Timeline</CardTitle>
                                <Button variant="ghost" size="sm">
                                    Edit
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { date: "Dec 2022", condition: "Pre-diabetic", value: "A1c: 10.4" },
                                        { date: "JAN 2022", condition: "Type 2", value: "A1c: 10.4" },
                                        { date: "JUL 2021", condition: "Chronic thyroid disorder", value: "A1c: 10.4" },
                                        { date: "JUL 2021", condition: "Angina Pectoris", value: "A1c: 10.4" },
                                        { date: "JUL 2021", condition: "Stroke", value: "A1c: 10.4" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="flex flex-col items-center mr-4">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                {i !== 4 && <div className="w-0.5 h-full bg-border" />}
                                            </div>
                                            <div>
                                                <div className="text-sm text-muted-foreground">{item.date}</div>
                                                <div className="font-medium">{item.condition}</div>
                                                <div className="text-sm text-muted-foreground">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Medical history</CardTitle>
                                    <Button variant="ghost" size="sm">
                                        Edit
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium">Chronic disease</div>
                                        <div className="text-sm text-muted-foreground">IHD, Obesity, Chronic thyroid disorder</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Diabetes Emergencies</div>
                                        <div className="text-sm text-muted-foreground">Diabetic Ketoacidosis</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Family disease</div>
                                        <div className="text-sm text-muted-foreground">Obesity (Father)</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">Diet</CardTitle>
                                    <Button variant="ghost" size="sm">
                                        Edit
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Coffee className="h-4 w-4" />
                                            <span>6 Cups - per day</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Cookie className="h-4 w-4" />
                                            <span>3 Cups - per day</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm">Intermittent fasting,Intermittent fasting</div>
                                        <div className="text-sm">Table sugar, Daily Avg 3/6</div>
                                        <div className="text-sm">Lactose,Beans</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">Medications</CardTitle>
                            <Button variant="ghost" size="sm">
                                Edit
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Ind.</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Sig.</TableHead>
                                        <TableHead>Start date</TableHead>
                                        <TableHead>Assign by</TableHead>
                                        <TableHead>Note</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "ACTRAPID ® HM 1", desc: "Amaryl 1 mg", status: "Adherent" },
                                        { name: "Panadol 1000m", desc: "Vitacid 1000m", status: "Somehow adherent" },
                                        { name: "Amaryl 1 mg", desc: "Amaryl 1 mg", status: "Not adherent" },
                                    ].map((med, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Pill className="h-4 w-4" />
                                                    <div>
                                                        <div>{med.name}</div>
                                                        <div className="text-sm text-muted-foreground">{med.desc}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>--</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        med.status === "Adherent"
                                                            ? "bg-green-100 text-green-800"
                                                            : med.status === "Somehow adherent"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                    }
                                                >
                                                    {med.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>--</TableCell>
                                            <TableCell>--</TableCell>
                                            <TableCell>Patient</TableCell>
                                            <TableCell>--</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
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