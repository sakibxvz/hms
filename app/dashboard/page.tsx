'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { ArrowUpRight, Bed, Calendar, Download, Eye, HeartPulse, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

export default function DashboardPage() {
	// Sample data for charts
	const visitorsData = Array.from({ length: 12 }, (_, i) => ({
		name: i + 1,
		value: Math.floor(Math.random() * 1000),
	}))

	const genderData = [
		{ name: 'Mon', male: 4000, female: 2400 },
		{ name: 'Tue', male: 3000, female: 1398 },
		{ name: 'Wed', male: 2000, female: 9800 },
		{ name: 'Thu', male: 2780, female: 3908 },
		{ name: 'Fri', male: 1890, female: 4800 },
		{ name: 'Sat', male: 2390, female: 3800 },
		{ name: 'Sun', male: 3490, female: 4300 },
	]

	const radarData = [
		{ subject: 'Cardiology', A: 120, B: 110, fullMark: 150 },
		{ subject: 'Pediatrics', A: 98, B: 130, fullMark: 150 },
		{ subject: 'Orthopedics', A: 86, B: 130, fullMark: 150 },
		{ subject: 'Neurology', A: 99, B: 100, fullMark: 150 },
		{ subject: 'Dermatology', A: 85, B: 90, fullMark: 150 },
		{ subject: 'General Medicine', A: 65, B: 85, fullMark: 150 },
	]

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-sm text-muted-foreground">
						Get an overview of key metrics and patient care status.
					</p>
				</div>
				<div className="flex gap-4">
					<Select defaultValue="7d">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select days" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Patients</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,879</div>
						<div className="text-xs text-muted-foreground">
							+15% from last month
						</div>
						<div className="h-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={visitorsData}>
									<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Appointments</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">955</div>
						<div className="text-xs text-muted-foreground">
							+5% from last week
						</div>
						<div className="h-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={visitorsData}>
									<Bar dataKey="value" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">324,763</div>
						<div className="text-xs text-muted-foreground">
							+2.5% from last month
						</div>
						<div className="h-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={visitorsData}>
									<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
						<HeartPulse className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">92%</div>
						<div className="text-xs text-muted-foreground">
							+0.5% from last week
						</div>
						<div className="h-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={visitorsData}>
									<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-medium">Bedrooms</CardTitle>
						<Bed className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">765</div>
						<div className="text-xs text-muted-foreground mb-4">
							Available bed capacity: 1,235
						</div>
						<div className="space-y-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="h-2 bg-primary/10 rounded-full" />
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[200px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={genderData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Bar dataKey="male" fill="#8884d8" stackId="a" />
									<Bar dataKey="female" fill="#82ca9d" stackId="a" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Department Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[200px]">
							<ResponsiveContainer width="100%" height="100%">
								<RadarChart data={radarData}>
									<PolarGrid />
									<PolarAngleAxis dataKey="subject" />
									<Radar name="Value" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
								</RadarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-sm font-medium">Top Doctors</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{
								name: "Dr. Emily White",
								role: "Chief Cardiologist",
								avatar: "/placeholder.svg",
							},
							{
								name: "Dr. Robert Brown",
								role: "Head of Pediatrics",
								avatar: "/placeholder.svg",
							},
							{
								name: "Dr. Linda Johnson",
								role: "General Medicine Specialist",
								avatar: "/placeholder.svg",
							},
						].map((doctor) => (
							<div key={doctor.name} className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarImage src={doctor.avatar} />
										<AvatarFallback>
											{doctor.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium leading-none">{doctor.name}</p>
										<p className="text-sm text-muted-foreground">{doctor.role}</p>
									</div>
								</div>
								<Button variant="ghost" size="icon">
									<ArrowUpRight className="h-4 w-4" />
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

