'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react'

// Dummy schedule data
const scheduleData = [
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '13:00', title: 'Paitent Check', attendees: ['JD', 'AS', 'MB'] },
    { id: 2, day: 'Monday', startTime: '14:00', endTime: '15:00', title: 'Paitent Health Check', attendees: ['JD', 'CL'] },
    { id: 3, day: 'Tuesday', startTime: '11:00', endTime: '16:00', title: 'Online Paitent Service', attendees: ['AS', 'MB'] },
    { id: 4, day: 'Wednesday', startTime: '8:00', endTime: '19:00', title: 'Paitent Check', attendees: ['JD', 'AS', 'MB', 'CL'] },
    { id: 5, day: 'Thursday', startTime: '11:00', endTime: '16:00', title: 'Operation', attendees: ['JD', 'CL'] },
    { id: 6, day: 'Friday', startTime: '13:00', endTime: '14:00', title: 'Weekly Wrap-up', attendees: ['JD', 'AS', 'MB', 'CL'] },
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

const formatTime = (time) => {
    const hour = parseInt(time.split(':')[0], 10);
    const formattedHour = hour <= 12 ? hour : hour - 12;
    const suffix = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour}:00 ${suffix}`;
};

export default function Schedule() {
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [selectedEvent, setSelectedEvent] = useState(null)

    const formatWeekRange = (date) => {
        const start = new Date(date)
        start.setDate(start.getDate() - start.getDay() + 1)
        const end = new Date(start)
        end.setDate(end.getDate() + 6)
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    }

    // const handlePrevWeek = () => {
    //     const newDate = new Date(currentWeek)
    //     newDate.setDate(newDate.getDate() - 7)
    //     setCurrentWeek(newDate)
    // }

    // const handleNextWeek = () => {
    //     const newDate = new Date(currentWeek)
    //     newDate.setDate(newDate.getDate() + 7)
    //     setCurrentWeek(newDate)
    // }

    const getEventStyle = (startTime, endTime) => {
        const start = parseInt(startTime.split(':')[0]) - 8
        const duration = parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])
        return {
            top: `${start * 60}px`,
            height: `${duration * 60}px`,
        }
    }

    return (
        <div className="container mx-auto p-4">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Weekly Schedule</h1>
               
            </header>

            <div className="flex items-center justify-between mb-6">
                {/* <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">{formatWeekRange(currentWeek)}</h2>
                    <Button variant="outline" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div> */}
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex justify-end">
                            <Button>
                                <Edit3 className="mr-1 h-4 w-4" />
                                Update Schedule
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Schedule</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="day" className="text-right">
                                    Day
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {days.map((day) => (
                                            <SelectItem key={day} value={day.toLowerCase()}>
                                                {day}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start-time" className="text-right">
                                    Start Time
                                </Label>
                                <Input id="start-time" type="time" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end-time" className="text-right">
                                    End Time
                                </Label>
                                <Input id="end-time" type="time" className="col-span-3" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="grid grid-cols-[auto,1fr] border-b">
                        <div className="w-20"></div>
                        <div className="grid grid-cols-5">
                            {days.map((day) => (
                                <div key={day} className="text-center py-2 font-semibold border-l">
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-[auto,1fr]">
                        <div className="w-20">
                            {hours.map((hour) => (
                                <div key={hour} className="h-[60px] text-right pr-2 text-sm text-gray-500">
                                    {hour <= 12 ? hour : hour - 12}:00 {hour < 12 ? 'AM' : 'PM'}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-5 relative">
                            {days.map((day) => (
                                <div key={day} className="border-l">
                                    {hours.map((hour) => (
                                        <div key={hour} className="h-[60px] border-t"></div>
                                    ))}
                                </div>
                            ))}
                            {scheduleData.map((event) => (
                                <div
                                    key={event.id}
                                    className="absolute bg-blue-500 text-white rounded p-2 text-xs"
                                    style={{
                                        ...getEventStyle(event.startTime, event.endTime),
                                        left: `${days.indexOf(event.day) * 20}%`,
                                        width: '19%',
                                    }}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="font-semibold">{event.title}</div>
                                    <div> {formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {selectedEvent && (
                <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedEvent.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label className="font-semibold">Day:</Label>
                                <div>{selectedEvent.day}</div>
                            </div>
                            <div>
                                <Label className="font-semibold">Time:</Label>
                                <div>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</div>
                            </div>
                            <div>
                                <Label className="font-semibold">Attendees:</Label>
                                <div className="flex space-x-2 mt-1">
                                    {selectedEvent.attendees.map((attendee, index) => (
                                        <Avatar key={index}>
                                            <AvatarFallback>{attendee}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => setSelectedEvent(null)}>Close</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}