'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircle2, HelpCircle, MoreVertical, Package, Pill, Plus, Search, ShoppingCart, XCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Component() {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [stockFilter, setStockFilter] = useState('all')

    const inventoryData = [
        { id: 1, name: "Aspirin", category: "Pain Relief", stock: 500, unit: "tablets", price: 0.05, supplier: "PharmaCorp", expiryDate: "2024-12-31" },
        { id: 2, name: "Amoxicillin", category: "Antibiotics", stock: 200, unit: "capsules", price: 0.25, supplier: "MediSupply", expiryDate: "2023-10-15" },
        { id: 3, name: "Lisinopril", category: "Blood Pressure", stock: 300, unit: "tablets", price: 0.15, supplier: "HeartHealth", expiryDate: "2024-06-30" },
        { id: 4, name: "Metformin", category: "Diabetes", stock: 400, unit: "tablets", price: 0.10, supplier: "DiabetesCare", expiryDate: "2024-09-30" },
        { id: 5, name: "Ibuprofen", category: "Pain Relief", stock: 600, unit: "tablets", price: 0.08, supplier: "PharmaCorp", expiryDate: "2024-11-30" },
        { id: 6, name: "Levothyroxine", category: "Thyroid", stock: 250, unit: "tablets", price: 0.20, supplier: "ThyroidHealth", expiryDate: "2024-08-31" },
        { id: 7, name: "Omeprazole", category: "Gastrointestinal", stock: 350, unit: "capsules", price: 0.30, supplier: "GutCare", expiryDate: "2024-07-31" },
        { id: 8, name: "Amlodipine", category: "Blood Pressure", stock: 280, unit: "tablets", price: 0.18, supplier: "HeartHealth", expiryDate: "2024-05-31" },
        { id: 9, name: "Sertraline", category: "Mental Health", stock: 180, unit: "tablets", price: 0.35, supplier: "MindWell", expiryDate: "2024-04-30" },
        { id: 10, name: "Albuterol", category: "Respiratory", stock: 100, unit: "inhalers", price: 15.00, supplier: "BreathEasy", expiryDate: "2023-12-31" },
    ]

    const filteredInventory = inventoryData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'all' || item.category === categoryFilter) &&
        (stockFilter === 'all' ||
            (stockFilter === 'low' && item.stock < 200) ||
            (stockFilter === 'medium' && item.stock >= 200 && item.stock < 500) ||
            (stockFilter === 'high' && item.stock >= 500))
    )

    const totalItems = inventoryData.reduce((sum, item) => sum + item.stock, 0)
    const lowStockItems = inventoryData.filter(item => item.stock < 200).length
    const expiringItems = inventoryData.filter(item => {
        const expiryDate = new Date(item.expiryDate)
        const threeMonthsFromNow = new Date()
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
        return expiryDate <= threeMonthsFromNow
    }).length

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Medicine Inventory</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Medicine
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Medicine</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new medicine to add to the inventory.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pain-relief">Pain Relief</SelectItem>
                                        <SelectItem value="antibiotics">Antibiotics</SelectItem>
                                        <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
                                        <SelectItem value="diabetes">Diabetes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock" className="text-right">
                                    Initial Stock
                                </Label>
                                <Input id="stock" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input id="price" type="number" step="0.01" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="expiry" className="text-right">
                                    Expiry Date
                                </Label>
                                <Input id="expiry" type="date" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Medicine</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalItems}</div>
                        <p className="text-xs text-muted-foreground">items in stock</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lowStockItems}</div>
                        <p className="text-xs text-muted-foreground">items below threshold</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{expiringItems}</div>
                        <p className="text-xs text-muted-foreground">items expiring in 3 months</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${inventoryData.reduce((sum, item) => sum + item.stock * item.price, 0).toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">total inventory value</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search medicines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                        <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                        <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                        <SelectItem value="Diabetes">Diabetes</SelectItem>
                        <SelectItem value="Thyroid">Thyroid</SelectItem>
                        <SelectItem value="Gastrointestinal">Gastrointestinal</SelectItem>
                        <SelectItem value="Mental Health">Mental Health</SelectItem>
                        <SelectItem value="Respiratory">Respiratory</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Stock Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="low">Low Stock</SelectItem>
                        <SelectItem value="medium">Medium Stock</SelectItem>
                        <SelectItem value="high">High Stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInventory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className={`mr-2 ${item.stock < 200 ? 'text-red-500' : item.stock < 500 ? 'text-yellow-500' : 'text-green-500'}`}>
                                                {item.stock < 200 ? <ArrowDownIcon className="h-4 w-4" /> : item.stock < 500 ? <ArrowRightIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />}
                                            </span>
                                            {item.stock} {item.unit}
                                        </div>
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>
                                        <Badge variant={new Date(item.expiryDate) <= new Date() ? "destructive" : new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3)) ? "warning" : "default"}>
                                            {item.expiryDate}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}