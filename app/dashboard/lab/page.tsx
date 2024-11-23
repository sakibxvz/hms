'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data for lab tests
const mockLabTests = [
    { id: 1, name: 'Complete Blood Count', description: 'Measures various components of the blood', cost: 50, status: 'Completed', patientName: 'John Doe', result: 'Normal' },
    { id: 2, name: 'Lipid Panel', description: 'Measures cholesterol and triglycerides', cost: 75, status: 'Pending', patientName: 'Jane Smith', result: '' },
    { id: 3, name: 'Thyroid Function Test', description: 'Checks the function of the thyroid gland', cost: 100, status: 'In Progress', patientName: 'Bob Johnson', result: '' },
    { id: 4, name: 'Liver Function Test', description: 'Assesses liver function and health', cost: 80, status: 'Completed', patientName: 'Alice Brown', result: 'Abnormal' },
    { id: 5, name: 'Urinalysis', description: 'Analyzes the content of urine', cost: 40, status: 'Pending', patientName: 'Charlie Wilson', result: '' },
    { id: 6, name: 'Hemoglobin A1C', description: 'Measures average blood sugar levels', cost: 60, status: 'Completed', patientName: 'Eva Martinez', result: 'Normal' },
    { id: 7, name: 'Vitamin D Test', description: 'Checks vitamin D levels in the blood', cost: 70, status: 'In Progress', patientName: 'David Lee', result: '' },
    { id: 8, name: 'Prostate-Specific Antigen', description: 'Screens for prostate cancer', cost: 90, status: 'Pending', patientName: 'George Taylor', result: '' },
    { id: 9, name: 'C-Reactive Protein', description: 'Measures inflammation in the body', cost: 55, status: 'Completed', patientName: 'Sarah Johnson', result: 'Normal' },
    { id: 10, name: 'Electrolyte Panel', description: 'Measures electrolyte levels in the blood', cost: 65, status: 'In Progress', patientName: 'Michael Brown', result: '' },
]

export default function LabTestManagement() {
    const [labTests, setLabTests] = useState(mockLabTests)
    const [searchTerm, setSearchTerm] = useState('')
    const [newTest, setNewTest] = useState({ name: '', description: '', cost: '', patientName: '' })
    const [isAddingTest, setIsAddingTest] = useState(false)
    const [selectedTest, setSelectedTest] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState('all')

    const itemsPerPage = 5
    const filteredTests = labTests.filter(test =>
        (test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.patientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeTab === 'all' || test.status.toLowerCase() === activeTab)
    )

    const pageCount = Math.ceil(filteredTests.length / itemsPerPage)
    const paginatedTests = filteredTests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleAddTest = () => {
        if (newTest.name && newTest.description && newTest.cost && newTest.patientName) {
            setLabTests([...labTests, { ...newTest, id: labTests.length + 1, status: 'Pending', result: '' }])
            setNewTest({ name: '', description: '', cost: '', patientName: '' })
            setIsAddingTest(false)
        }
    }

    const handleViewResult = (test) => {
        setSelectedTest(test)
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Lab Test Management</h1>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search lab tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm"
                    />
                </div>
                <Dialog open={isAddingTest} onOpenChange={setIsAddingTest}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Test
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Lab Test</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new lab test here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newTest.name}
                                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={newTest.description}
                                    onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cost" className="text-right">
                                    Cost
                                </Label>
                                <Input
                                    id="cost"
                                    type="number"
                                    value={newTest.cost}
                                    onChange={(e) => setNewTest({ ...newTest, cost: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="patientName" className="text-right">
                                    Patient Name
                                </Label>
                                <Input
                                    id="patientName"
                                    value={newTest.patientName}
                                    onChange={(e) => setNewTest({ ...newTest, patientName: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddTest}>Add Lab Test</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Tests</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="in progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Lab Tests</CardTitle>
                            <CardDescription>A list of all lab tests in the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedTests.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell className="font-medium">{test.name}</TableCell>
                                            <TableCell>{test.patientName}</TableCell>
                                            <TableCell>{test.description}</TableCell>
                                            <TableCell>${test.cost}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={test.status === 'Completed' ? 'default' : test.status === 'In Progress' ? 'secondary' : 'outline'}
                                                >
                                                    {test.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => handleViewResult(test)}>
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex items-center justify-end space-x-2 py-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="text-sm font-medium">
                                    Page {currentPage} of {pageCount}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                                    disabled={currentPage === pageCount}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Lab Tests</CardTitle>
                            <CardDescription>A list of pending lab tests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedTests.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell className="font-medium">{test.name}</TableCell>
                                            <TableCell>{test.patientName}</TableCell>
                                            <TableCell>{test.description}</TableCell>
                                            <TableCell>${test.cost}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => handleViewResult(test)}>
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="in progress" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>In Progress Lab Tests</CardTitle>
                            <CardDescription>A list of lab tests currently in progress.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedTests.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell className="font-medium">{test.name}</TableCell>
                                            <TableCell>{test.patientName}</TableCell>
                                            <TableCell>{test.description}</TableCell>
                                            <TableCell>${test.cost}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => handleViewResult(test)}>
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Lab Tests</CardTitle>
                            <CardDescription>A list of completed lab tests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Result</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedTests.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell className="font-medium">{test.name}</TableCell>
                                            <TableCell>{test.patientName}</TableCell>
                                            <TableCell>{test.description}</TableCell>
                                            <TableCell>${test.cost}</TableCell>
                                            <TableCell>{test.result}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => handleViewResult(test)}>
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View
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

            <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedTest?.name} Results</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Patient:</Label>
                            <div className="col-span-3">{selectedTest?.patientName}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Status:</Label>
                            <div className="col-span-3">
                                <Badge
                                    variant={selectedTest?.status === 'Completed' ? 'default' : selectedTest?.status === 'In Progress' ? 'secondary' : 'outline'}
                                >
                                    {selectedTest?.status}
                                </Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Description:</Label>
                            <div className="col-span-3">{selectedTest?.description}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Cost:</Label>
                            <div className="col-span-3">${selectedTest?.cost}</div>
                        </div>
                        {selectedTest?.status === 'Completed' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-bold">Result:</Label>
                                <div className="col-span-3">{selectedTest?.result}</div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setSelectedTest(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}