'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BellRing, CreditCard, Globe, Lock, Mail, User, Palette, Boxes } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function UserPage() {
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
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value="appearance">
                                <Palette className="h-4 w-4 mr-2" />
                                Appearance
                            </TabsTrigger>
                            <TabsTrigger value="notifications">
                                <BellRing className="h-4 w-4 mr-2" />
                                Notifications
                            </TabsTrigger>
                            <TabsTrigger value="billing">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Billing
                            </TabsTrigger>
                            <TabsTrigger value="security">
                                <Lock className="h-4 w-4 mr-2" />
                                Security
                            </TabsTrigger>
                            <TabsTrigger value="integrations">
                                <Boxes className="h-4 w-4 mr-2" />
                                Integrations
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="account" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Account</h3>
                                <p className="text-sm text-muted-foreground">
                                    Update your account settings. Set your email and password.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" placeholder="@john" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="profile" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Profile</h3>
                                <p className="text-sm text-muted-foreground">
                                    Update your profile information and bio.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" placeholder="Tell us about yourself" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" placeholder="https://example.com" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="appearance" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Appearance</h3>
                                <p className="text-sm text-muted-foreground">
                                    Change how your dashboard looks and feels.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Brand color</Label>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-md bg-[#A48AFB]" />
                                        <Input defaultValue="#A48AFB" className="w-28" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Dashboard charts</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Card className="relative">
                                            <CardContent className="p-4">
                                                <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500 to-blue-500" />
                                                <p className="mt-2 text-sm font-medium">Default</p>
                                                <p className="text-xs text-muted-foreground">Default company branding.</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-500 to-gray-700" />
                                                <p className="mt-2 text-sm font-medium">Simplified</p>
                                                <p className="text-xs text-muted-foreground">Minimal and modern.</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-800" />
                                                <p className="mt-2 text-sm font-medium">Custom CSS</p>
                                                <p className="text-xs text-muted-foreground">Manage styling with CSS.</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Select defaultValue="en-GB">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en-GB">
                                                <div className="flex items-center">
                                                    <Globe className="w-4 h-4 mr-2" />
                                                    English (UK)
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="en-US">English (US)</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Notifications</h3>
                                <p className="text-sm text-muted-foreground">Configure your notification preferences.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <Label htmlFor="email-notifications">Email notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                                    </div>
                                    <Switch id="email-notifications" />
                                </div>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <Label htmlFor="push-notifications">Push notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser.</p>
                                    </div>
                                    <Switch id="push-notifications" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="billing" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Billing</h3>
                                <p className="text-sm text-muted-foreground">Manage your billing information and view your invoices.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Payment Method</Label>
                                    <RadioGroup defaultValue="card" className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card">Credit Card</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="paypal" id="paypal" />
                                            <Label htmlFor="paypal">PayPal</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="security" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Security</h3>
                                <p className="text-sm text-muted-foreground">Manage your security preferences.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="integrations" className="border-none outline-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Integrations</h3>
                                <p className="text-sm text-muted-foreground">Manage your connected applications and services.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <Label>GitHub</Label>
                                        <p className="text-sm text-muted-foreground">Connect your GitHub account.</p>
                                    </div>
                                    <Button variant="outline">Connect</Button>
                                </div>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <Label>Google</Label>
                                        <p className="text-sm text-muted-foreground">Connect your Google account.</p>
                                    </div>
                                    <Button variant="outline">Connect</Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}