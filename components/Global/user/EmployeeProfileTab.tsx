import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { UserState } from "@/types";

interface props {
    user: UserState;
}

const EmployeeProfileTab = ({ user }: props) => {
    return (
        <TabsContent value="profile" className="border-none outline-none">
            <div className="space-y-6">
                {/* Profile Information */}
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Update your profile information and bio.
                    </p>
                </div>
                <div className="space-y-4">
                    {/* First Name */}
                    <div className="space-y-2">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input id="firstname" placeholder="First Name" />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input id="lastname" placeholder="Last Name" />
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Your Department</SelectLabel>
                                    <SelectItem value="LAB">LAB</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                    <SelectItem value="NURSE">NURSE</SelectItem>
                                    <SelectItem value="MANAGEMENT">MANAGEMENT</SelectItem>
                                    <SelectItem value="DOCTOR">DOCTOR</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Schedule Management */}
                <div>
                    <h3 className="text-lg font-medium">Schedules</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your weekly schedule.
                    </p>
                    <div className="space-y-4">
                        {/* Schedule Day */}
                        <div className="space-y-2">
                            <Label htmlFor="schedule-day">Day</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a Day</SelectLabel>
                                        <SelectItem value="MONDAY">Monday</SelectItem>
                                        <SelectItem value="TUESDAY">Tuesday</SelectItem>
                                        <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                                        <SelectItem value="THURSDAY">Thursday</SelectItem>
                                        <SelectItem value="FRIDAY">Friday</SelectItem>
                                        <SelectItem value="SATURDAY">Saturday</SelectItem>
                                        <SelectItem value="SUNDAY">Sunday</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Start Time */}
                        <div className="space-y-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input id="start-time" type="time" placeholder="Start Time" />
                        </div>

                        {/* End Time */}
                        <div className="space-y-2">
                            <Label htmlFor="end-time">End Time</Label>
                            <Input id="end-time" type="time" placeholder="End Time" />
                        </div>
                    </div>
                </div>


                {/* Doctor Details */}
                <div>
                    <h3 className="text-lg font-medium">Doctor Details</h3>
                    <p className="text-sm text-muted-foreground">
                        Additional details for doctors.
                    </p>
                    <div className="space-y-4">
                        {/* Specialization */}
                        <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization</Label>
                            <Input id="specialization" placeholder="Specialization" />
                        </div>

                        {/* Medical License */}
                        <div className="space-y-2">
                            <Label htmlFor="medical-license">Medical License</Label>
                            <Input id="medical-license" placeholder="Medical License" />
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

export default EmployeeProfileTab;
