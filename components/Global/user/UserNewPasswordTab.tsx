'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { UserState } from '@/types';

interface Props {
    user: UserState;
}

const UserNewPasswordTab = ({ user }: Props) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);

    const togglePasswordVisibility = () => setShowPasswords(!showPasswords);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/user/update-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    currentPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                alert(error || 'Failed to update password');
                setIsSubmitting(false);
                return;
            }

            alert('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        }
    };

    return (
        <TabsContent value="security" className="border-none outline-none">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Security</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your security preferences.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input
                            id="current"
                            type={showPasswords ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input
                            id="new"
                            type={showPasswords ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm New Password</Label>
                        <Input
                            id="confirm"
                            type={showPasswords ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={showPasswords}
                                onChange={togglePasswordVisibility}
                            />
                            <span>Show Passwords</span>
                        </label>
                    </div>
                </div>
            </div>
            <Button
                className="my-5"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
        </TabsContent>
    );
};

export default UserNewPasswordTab;
