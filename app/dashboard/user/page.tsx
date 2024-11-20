'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Mail, User, } from "lucide-react"
import UserNewPasswordTab from "@/components/Global/user/UserNewPasswordTab"
import EmployeeProfileTab from "@/components/Global/user/EmployeeProfileTab"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import UserAccountUpdateTab from "@/components/Global/user/UserAccountUpdateTab"

export default function UserPage() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="w-full">
            <div className="h-full px-4 py-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
                        <p className="text-sm text-muted-foreground py-2">
                            Manage your account settings and preferences.
                        </p>
                    </div>
                </div>
                <Tabs defaultValue="account" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="account" className="relative">
                                <User className="h-4 w-4 mr-2" />
                                Account
                            </TabsTrigger>
                            <TabsTrigger value="profile">
                                <Mail className="h-4 w-4 mr-2" />
                                Employee
                            </TabsTrigger>

                            <TabsTrigger value="security">
                                <Lock className="h-4 w-4 mr-2" />
                                Security
                            </TabsTrigger>

                        </TabsList>
                    </div>
                    <UserAccountUpdateTab user={user} />
                    <EmployeeProfileTab user={user} />
                    <UserNewPasswordTab user={user} />
                </Tabs>
                <p>{user.id}</p>

            </div>
        </div>
    )
}